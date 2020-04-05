import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import * as Sentry from '@sentry/node';
import universalLanguageDetect from '@unly/universal-language-detector';
import { ERROR_LEVELS } from '@unly/universal-language-detector/lib/utils/error';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { AmplitudeClient, Identify } from 'amplitude-js';
import 'animate.css/animate.min.css'; // Loads animate.css CSS file. See https://github.com/daneden/animate.css
import { IncomingMessage } from 'http';
import get from 'lodash.get';
import { NextPageContext } from 'next';
import NextCookies from 'next-cookies';
import NextApp from 'next/app';
import React, { ErrorInfo } from 'react';

import { AppInitialProps } from '../types/AppInitialProps';
import { AppRenderProps } from '../types/AppRenderProps';
import { Cookies } from '../types/Cookies';
import { PageProps } from '../types/PageProps';
import { PublicHeaders } from '../types/PublicHeaders';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';
import { LANG_EN, SUPPORTED_LANGUAGES } from '../utils/i18n'; // XXX Init Sentry
import '../utils/ignoreNoisyWarningsHacks'; // HACK
import '../utils/sentry';
import UniversalCookiesManager from '../utils/UniversalCookiesManager';

const fileLabel = 'pages/_app';
const logger = createLogger({
  label: fileLabel,
});

class NRNApp extends NextApp {
  /**
   * Initialise the application
   *
   * XXX Executed both on server and client side, but with different props (req, res are undefined on the client-side)
   *
   * @param props
   * @see https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle
   */
  static async getInitialProps(props: AppInitialProps): Promise<AppRenderProps> {
    const { ctx }: AppInitialProps = props;
    const { req, res }: NextPageContext = ctx;
    const readonlyCookies: Cookies = NextCookies(ctx); // Parses Next.js cookies in a universal way (server + client)
    const cookiesManager: UniversalCookiesManager = new UniversalCookiesManager(req, res);
    const userSession: UserSemiPersistentSession = cookiesManager.getUserData();
    let publicHeaders: PublicHeaders = {};

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      scope.setTag('userId', userSession.id);
      scope.setContext('userSession', userSession);
      scope.setContext('cookies', readonlyCookies);
    });

    Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
      category: fileLabel,
      message: `Preparing app (${isBrowser() ? 'browser' : 'server'})`,
      level: Sentry.Severity.Debug,
    });

    if (req) {
      const { headers }: IncomingMessage = req;
      publicHeaders = {
        'accept-language': get(headers, 'accept-language'),
        'user-agent': get(headers, 'user-agent'),
        'host': get(headers, 'host'),
      };

      Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
        scope.setContext('headers', headers);
      });
    }

    // Resolves the lang, will first check in cookies, and then browser settings
    const lang: string = universalLanguageDetect({
      supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
      fallbackLanguage: LANG_EN, // Fallback language in case the user's language cannot be resolved
      acceptLanguageHeader: get(req, 'headers.accept-language'), // Optional - Accept-language header will be used when resolving the language on the server side
      serverCookies: readonlyCookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
      errorHandler: (error: Error, level: ERROR_LEVELS, origin: string, context: object): void => {
        Sentry.withScope((scope): void => {
          scope.setExtra('level', level);
          scope.setExtra('origin', origin);
          scope.setContext('context', context);
          Sentry.captureException(error);
        });
        logger.error(error.message);
      },
    });

    // Calls page's `getInitialProps` and fills `appProps.pageProps` - XXX See https://nextjs.org/docs#custom-app
    const appProps: AppRenderProps = await NextApp.getInitialProps(props);

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      scope.setExtra('lang', lang);
    });

    appProps.pageProps = {
      ...appProps.pageProps,
      headers: publicHeaders, // Publicly available headers - whitelist
      readonlyCookies,
      userSession,
      lang, // i.e: 'en'
      isSSRReadyToRender: true,
      isSSR: !!req,
    };

    return { ...appProps };
  }

  /**
   * Renders the whole application (providers, layout, etc.)
   *
   * XXX Executed both on server and client side
   *  req, res are not accessible here
   *
   * @return {JSX.Element}
   */
  render(): JSX.Element {
    const {
      Component,
      pageProps, // Type of AppPageProps
      router,
      err,
    }: AppRenderProps = this.props;

    Sentry.configureScope((scope) => { // See https://www.npmjs.com/package/@sentry/node
      // Only track meaningful data from router, as it contains lots of noise
      scope.setContext('router', {
        route: router.route,
        pathname: router.pathname,
        query: router.query,
        asPath: router.asPath,
      });
    });

    Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
      category: fileLabel,
      message: `Rendering app for Component "${get(Component, 'name', 'unknown')}" (${isBrowser() ? 'browser' : 'server'})`,
      level: Sentry.Severity.Debug,
    });

    // Build initial layout properties, they may be enhanced later on depending on the runtime engine
    const enhancedPageProps: PageProps = {
      ...pageProps,
      err,
      router,
    };

    console.debug('enhancedPageProps', enhancedPageProps);

    // XXX For an unknown reason, I noticed 2 render() calls. (each render call starts a new graphql request, and it makes debugging harder)
    //  The first one doesn't contain any data from the server (no data, almost nothing) and therefore result in errors along the react sub tree
    //  The second contains the expected data
    //  Due to this behaviour, an "isSSRReadyToRender" variable has been introduced, to make sure we only render the components when all the data have been provided
    if (enhancedPageProps.isSSRReadyToRender) {
      /**
       * App rendered both on client or server (universal/isomorphic)
       *
       * @return {JSX.Element}
       * @constructor
       */
      const UniversalApp = (): JSX.Element => (
        <Component
          // XXX This "Component" is a dynamic Next.js page which depends on the current route
          {...enhancedPageProps}
        />
      );

      // On the browser, we render additional things, such as Amplitude (data analytics)
      if (isBrowser()) {
        const userId = get(enhancedPageProps, 'userSession.id', 'NOT_SET');

        // XXX Amplitude is disabled on the server side, it's only used on the client side
        //  (avoids double events + amplitude-js isn't server-side compatible anyway)
        const amplitude = require('amplitude-js'); // eslint-disable-line @typescript-eslint/no-var-requires
        const amplitudeInstance: AmplitudeClient = amplitude.getInstance();

        // https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
        amplitudeInstance.init(process.env.AMPLITUDE_API_KEY, null, {
          userId,
          logLevel: process.env.APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
          includeGclid: true,
          includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
          includeUtm: true,
          // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
          onError: (error): void => {
            Sentry.captureException(error);
            console.error(error); // eslint-disable-line no-console
          },
        });

        amplitudeInstance.setVersionName(process.env.APP_VERSION); // i.e: 1.0.0

        // Inject additional variables in the layout
        enhancedPageProps.amplitudeInstance = amplitudeInstance;

        // We're only doing this when detecting a new session, as it won't be executed multiple times for the same session anyway, and it avoids noise
        if (amplitudeInstance.isNewSession()) {
          // Store whether the visitor originally came from an iframe (and from where)
          const visitor: Identify = new amplitudeInstance.Identify();
          // XXX See https://github.com/amplitude/Amplitude-JavaScript/issues/223
          visitor.setOnce('initial_lang', enhancedPageProps.lang); // DA Helps figuring out if the initial language (auto-detected) is changed afterwards
          // DA This will help track down the users who discovered our platform because of an iframe

          amplitudeInstance.identify(visitor); // Send the new identify event to amplitude (updates user's identity)
        }

        return (
          <AmplitudeProvider
            amplitudeInstance={amplitudeInstance}
            apiKey={process.env.AMPLITUDE_API_KEY}
            userId={userId}
          >
            <Amplitude
              // DA Event props and user props are sometimes duplicated to ease the data analysis through Amplitude
              //  Because charts are sometimes easier to build using events props, or user users props
              eventProperties={{
                app: {
                  name: process.env.APP_NAME,
                  version: process.env.APP_VERSION,
                  stage: process.env.APP_STAGE,
                },
                page: {
                  url: location.href,
                  path: location.pathname,
                  origin: location.origin,
                  name: null,
                },
                lang: enhancedPageProps.lang,
              }}
              userProperties={{
                lang: enhancedPageProps.lang,
              }}
            >
              <UniversalApp />
            </Amplitude>
          </AmplitudeProvider>
        );
      } else {
        // On the server, we just render the universal app without additional stuff (for now)
        return (
          <UniversalApp />
        );
      }
    } else {
      return null;
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }
}

export default NRNApp;
