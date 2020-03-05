import { AmplitudeClient } from 'amplitude-js';
import { NextRouter } from 'next/router';
import { AppPageProps } from './AppPageProps';

/**
 * Properties that are available by any Next.js page
 *
 * The layout properties (LayoutProps) are enhanced by the Layout
 */
export declare type PageProps = {
  router: NextRouter;
  // i18nextInstance: i18n;
  err?: Error; // Only defined if there was an error

  // Only available on the client side
  isInIframe?: boolean;
  amplitudeInstance?: AmplitudeClient;
} & AppPageProps;
