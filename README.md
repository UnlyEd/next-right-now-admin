<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/8cb455deab217c839afc/maintainability)](https://codeclimate.com/github/UnlyEd/next-right-now-admin/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8cb455deab217c839afc/test_coverage)](https://codeclimate.com/github/UnlyEd/next-right-now-admin/test_coverage)

> # Status: **DRAFT/WIP** - Do not use in production, subject to massive changes anytime

Next Right Now Admin
===

> Next Right Now Admin is a boilerplate to quickly build an Admin frontend, based on [NRN](https://github.com/UnlyEd/next-right-now) and [react-admin](https://github.com/marmelab/react-admin)
>
> We are also considering using [`@api-platform/admin`](https://github.com/api-platform/admin) which offers **huge benefits** on top of `react-admin` (but we're stuck so far with https://github.com/api-platform/admin/issues/281, [see PR](https://github.com/UnlyEd/next-right-now-admin/pull/1))

# Benefits

- See [React Admin features](https://github.com/marmelab/react-admin#features)
    * Adapts to any backend (REST, GraphQL, SOAP, etc.)
    * Powered by [material-ui](https://material-ui.com/), [redux](https://redux.js.org/), [react-final-form](https://final-form.org/react), [redux-saga](https://redux-saga.js.org/), [react-router](https://reacttraining.com/react-router/), [recompose](https://github.com/acdlite/recompose), [reselect](https://github.com/reduxjs/reselect) and a few more
    * Super-fast UI thanks to optimistic rendering (renders before the server returns)
    * Undo updates and deletes for a few seconds
    * Complete documentation
    * Relationships (many to one, one to many)
    * Data Validation
    * Internationalization (i18n)
    * Conditional formatting
    * Themeable
    * Supports any authentication provider (REST API, OAuth, Basic Auth, ...)
    * Full-featured datagrid (sort, pagination, filters)
    * Filter-as-you-type
    * Supports any form layout (simple, tabbed, etc.)
    * Custom actions
    * Large library of components for various data types: boolean, number, rich text, etc.
    * WYSIWYG editor
    * Customize dashboard, menu, layout
    * Super easy to extend and override (it's just React components)
    * Highly customizable interface
    * Can connect to multiple backends
    * Can be included in another React app
    * Inspired by the popular [ng-admin](https://github.com/marmelab/ng-admin) library (also by marmelab)
- See [API Platform features](https://github.com/api-platform/admin#features)
    * Automatically generate an admin interface for all the resources of the API thanks to hypermedia features of Hydra
    * Generate list, create, show, edit screens as well as a delete button
    * Generate suitable inputs and fields according to the API doc (e.g. number HTML input for numbers, checkbox for booleans, selectbox for relationships...)
    * Generate suitable inputs and fields according to Schema.org types if available (e.g. email field for http://schema.org/email)
    * Handle relationships
    * Pagination support
    * Automatically validate if a field is mandatory client-side according to the API description
    * Send proper HTTP requests to the API and decode them using Hydra and JSON-LD formats
    * Nicely display server-side errors (e.g. advanced validation)
    * **100% customizable**
- See [NRN benefits](https://github.com/UnlyEd/next-right-now#benefits)
    - **B2B multi-tenants** (AKA **"monorepo"**) first-class support (optional, **advanced use-case**)
      - Supports configuration, deployment, testing, monitoring of multiple customers through the same project (identical code base, monorepo design)
      - This is a very special consideration, and required quite a lot of efforts to make it works smoothly
        - With multi-tenants setup, we don't use the native **Zeit <> Github integration**, but our **custom Zeit <> Github Actions integration** instead ([.github](.github))
      - Most projects do not need such capability, but we build our own projects with such requirement in mind, and thus released NRN with such built-in capability
      - **It's very easy not to use it** if you don't need to, but it'll be a huge time saver for you if you need it!
    - Built-in **stages** (development, staging, production) workflow
    - **TypeScript** first-class support
    - **GraphQL** support (thanks to [Apollo](https://github.com/apollographql/apollo-client), and others)
      - **GraphCMS** first-class support, which hosts our GraphQL API (server) and database, fully hosted (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
      - **GraphQL schema** available in the developer environment (thanks to [GraphQL Config](https://github.com/kamilkisiela/graphql-config))
    - **SSR** and **CSR** capabilities (thanks to the [Next.js framework](https://nextjs.org/))
    - React hooks over HOC (functional components over classes)
    - **Internationalisation** (i18n) first-class support (SSR + CSR friendly) (thanks to [react-i18next](https://react.i18next.com/))
      - I18n of the database (thanks to [GraphCMS<sup>1</sup>](https://graphcms.com/?ref=unly-nrn))
          - [Automated fallback language, through HTTP headers](https://graphcms.com/features/content-localization/?ref=unly-nrn)
      - I18n of the project (thanks to [Locize<sup>1</sup>](https://locize.com/?lng=en))
          - [Automated fallback language](https://www.i18next.com/principles/fallback)
          - [In-context editor](https://docs.locize.com/more/incontext-editor)
          - Auto-add i18n keys with default translation when working locally
    - **Testing** first-class support
      - TS-friendly (thanks to [ts-jest](https://github.com/kulshekhar/ts-jest))
      - End-to-end (E2E) tests (thanks to [Cypress](https://www.cypress.io/))
      - Other tests, such as unit tests, etc. (thanks to [Jest](https://jestjs.io/), [Jest extended](https://github.com/jest-community/jest-extended))
    - Strong **observability** of the system (monitoring) and push-notification on your own messaging channel (i.e: Slack) when things go wrong (thanks to [Sentry<sup>1</sup>](https://sentry.io/))
    - **Universal JS**, to re-use code as much as possible between frontend and backend (i.e: universal cookies API)
    - Powerful **CSS-in-JS** styles, SSR & CSR friendly, JSX-friendly, styled-component friendly (thanks to [Emotion](https://github.com/emotion-js/emotion))
    - **Font** first-class support (SSR/CSR friendly, no FOUT effect) (thanks to [WebFontLoader](https://github.com/typekit/webfontloader))
    - Fine-grained frontend **analytics**, react-friendly, flexible, SPA-friendly (thanks to [Amplitude<sup>1</sup>**<sup>2</sup>**](https://amplitude.com/))
    - **Integrated CI/CD pipeline**, automated deployments to preview domains and production domains (thanks to the [Zeit](https://zeit.co/), [GitHub Actions](https://github.com/features/actions))
      - Including a dedicated "per-deployment domain", for fast feedback loop and testing means, in an online environment (staging)
      - Including a dedicated "per-branch domain", for fast feedback loop and testing means, in an online environment with a url which is automatically updated as new pushed commits are being deployed (staging)
    - Built-in **utilities**
      - Convert SVG to TSX components (thanks to [SVGR](https://github.com/gregberge/svgr))
      - Font Awesome icons as react components, with SSR support (thanks to [Font Awesome](https://github.com/FortAwesome/react-fontawesome))
      - Bootstrap support (thanks to [Reactstrap](https://reactstrap.github.io/))
      - Node debug mode for the server side (only built-in on WebStorm)
      - NPM security audit (script)
      - NPM developer-friendly outdated packages (script)
      - Display warning on outdated browsers, works even if bundle isn't ES5 compatible (IE11, etc.)
      - Use Zeit secrets for sensitive information
    - [Fully documented usage of all our third party NPM libraries (AKA dependencies)](https://github.com/UnlyEd/next-right-now/README_DEPENDENCIES.md)
---

<!-- toc -->

- [Getting started](#getting-started)
  * [Showcases - Live demo](#showcases---live-demo)
  * [How to use](#how-to-use)
- [Understanding `Environments` and `Stages`](#understanding-environments-and-stages)
  * [What is an `environment`?](#what-is-an-environment)
  * [What is a `stage`?](#what-is-a-stage)
- [I18n (Internationalization)](#i18n-internationalization)
- [GraphCMS](#graphcms)
  * [Discount](#discount)
  * [Fetching data from GraphCMS](#fetching-data-from-graphcms)
- [Amplitude](#amplitude)
  * [Chrome developer debug tool](#chrome-developer-debug-tool)
- [Continuous Integration & Continuous Deployment (CI/CD)](#continuous-integration--continuous-deployment-cicd)
  * [Overview](#overview)
  * [Workflow of our Zeit <> Github Actions integration](#workflow-of-our-zeit--github-actions-integration)
  * [In-depth project's dependencies](#in-depth-projects-dependencies)
- [Testing](#testing)
  * [CI tests Workflow](#ci-tests-workflow)
  * [Running tests manually (locally)](#running-tests-manually-locally)
  * [Running E2E tests manually (locally)](#running-e2e-tests-manually-locally)
- [Project folders structure](#project-folders-structure)
- [License](#license)
- [Vulnerability disclosure](#vulnerability-disclosure)
- [Contributors and maintainers](#contributors-and-maintainers)
- [**[ABOUT UNLY]**](#about-unly-)

<!-- tocstop -->

---

# Getting started

## Showcases - Live demo

https://nrn-admin.unly.now.sh/

> **Tip**: You can get metadata at [/api/status](https://nrn-admin.unly.now.sh/api/status)
>
> **Tip**: All `/api/*` are serverless functions, running under AWS Lambda

## How to use



---

# Understanding `Environments` and `Stages`

> The application relies on environment variables to function correctly.
> Those variables are provided differently depending on the environment.

When working on the `development` environment (localhost), the variables from [`.env.build`](.env.build) are used by [the webpack configuration](./next.config.js)

When deploying an instance to the Zeit's platform, the variables used are the one that belong to that instance, such as:
- `yarn deploy:customer1`: This script will deploy an instance using the [`now.customer1.production.json`](now.staging.json) file.
- `yarn deploy:customer1:production`: This script will deploy an instance using the [`now.customer1.production.json`](now.production.json) file.

> In those files, it's the `build.env` part that is used at build time (build is done on Zeit), which basically replaces all references of every environment variable by the actual value (string replace).

## What is an `environment`?

> An environment is "where" the application is running.
> It can be either "development" (localhost) or "production" (on Zeit's servers).
>
> **The `environment` is defined by the `NODE_ENV` environment variable.**
>
> **N.B**: It is not possible to any other value, [as enforced by Next](https://github.com/zeit/next.js/blob/master/errors/env-key-not-allowed.md)

When working on your local computer, you automatically use `NODE_ENV=developement`.

The environment affects how the application **is bundled**, it is used at **build time**. (webpack, hot-reloading, etc.)

> i.e: In `development` environment, you have access to PropTypes warnings, but you won't in `production`.

## What is a `stage`?

> A stage is "how" the application is running.
> It can be either "development" (localhost), "staging" or "production" (on Zeit's servers) - _You can add more if you need_
>
> **The `stage` is defined by the `APP_STAGE` environment variable.**
>
> **N.B**: You can use any stage name you like, there is no restriction.

- When working on your local computer, you automatically use `APP_STAGE=developement`.
- When creating a Zeit preview deployment (i.e: when pushing a commit/branch (CD), when using `yarn deploy`, etc.), you automatically use `APP_STAGE=staging`.
- When creating a Zeit production deployment (i.e: when using `yarn deploy:customer1:production`, when merging a PR to `master`, etc.), you automatically use `APP_STAGE=production`.

The stage changes the behaviour of the application, because we sometimes need the application to behave differently depending on the stage.

> i.e: In `production` stage, the Locize configuration uses the `production` version.
> When using another stage, it uses the `latest` version.

> i.e: We don't want to enable the same level of debugging in production environment.
> For instance, Locize is configured to be in `debug` mode only in non-production stages.

---

# I18n (Internationalization)

TODO

---

# [GraphCMS](https://graphcms.com/?ref=unly-nrn-admin)

## Discount

> Using the coupon code **`unly-nrn`** will grant you a 3-month 15% discount on the premium plans.

## Fetching data from GraphCMS

TODO

---

# [Amplitude](https://amplitude.com/) (Analytics)

> Amplitude is used to collect usage metrics (analytics) of the application.

Amplitude **is used only on the frontend part of the application**. It is composed of two parts:
- [`@amplitude/react-amplitude`](https://github.com/amplitude/react-amplitude): React components easy to use, see their [blog post](https://amplitude.engineering/introducing-react-amplitude-d7b5258bc708).
- [`amplitude-js`](https://github.com/amplitude/Amplitude-JavaScript): The JS SDK, only compatible from the browser. (They're working on making it [compatible with SSR](https://github.com/amplitude/Amplitude-JavaScript/issues/164))

See the [documentation example at react-amplitude](https://github.com/amplitude/react-amplitude#example-instrumenting-tic-tac-toe-from-facebooks-intro-to-react-tutorial) to understand how it's meant to be used.
We only use react-amplitude to manipulate events.

> **Known limitation**: Amplitude doesn't provide any backend-compatible API. See https://github.com/amplitude/Amplitude-JavaScript/issues/164

## Chrome developer debug tool

> The amplitude team has released a Chrome plugin to see the events from the browser.
>
> It is a **must-have** when working with Amplitude. It's very simple to use and quite helpful.

- [Tutorial](https://help.amplitude.com/hc/en-us/articles/360003032451-Instrumentation-Explorer-Debugger)
- [Chrome plugin](https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp)


---

# Continuous Integration & Continuous Deployment (CI/CD)

## Overview

> Every time a commit is pushed to the repository, or a branch is merged, automated actions are triggered.
>
> Those actions are managed through Github Actions

## Workflow of our Zeit <> Github Actions integration

Here is how the multiple steps are ordered:

1. [Event] A commit is pushed, a branch is merged (or on any change made on the remote repository)
1. [Trigger] Our [Github Actions](./.github/workflows) are triggered
    - Either the staging scripts is executed, or the production script, depending on which branch is impacted (see [Github Actions <> Zeit integrations](./.github/workflows/README.md))
    - No matter what script (production vs staging) gets executed, those actions are always triggered:
        1. A new Zeit deployment is triggered, which runs our tests first (`yarn test:once`) (Failing tests will stop the deployment)
        1. Then, the deployment is deployed, and automatically linked to a custom domain which depends on the git branch name (xxx.now.sh)
        1. Then, our 2E2 tests are triggered using Cypress
            - If they fail, artifacts (screenshots, videos) recorded by Cypress are uploaded to Github to help further debug (See [example](https://github.com/UnlyEd/next-right-now-admin/runs/487000885))

## In-depth project's dependencies

See [README_DEPENDENCIES](./README_DEPENDENCIES.md)


---

# Testing

## CI tests Workflow

Zeit will automatically run the tests before deploying, as configured in the `yarn build` command.

> If any test fail, the deployment will be aborted. This ensures that any code that doesn't pass the tests never get deployed online.

Once a deployment has been deployed on Zeit, **Github Actions** will run our **E2E tests**, to make sure that the app behaves as expected.
This can also be considered as an integration tests suite.

## Running tests manually (locally)
You can run interactive tests using Jest with `yarn test` script.

## Running E2E tests manually (locally)
You can run interactive E2E tests using Cypress with `yarn e2e:open` script.

You can also run them non-interactively using `yarn e2e:run` script.

> You may need to run `yarn e2e:install` script first

---

# Project folders structure

> Overview of the project folder and files structure

- `cypress`: Folder used by Cypress (E2E), see ["Getting started"](https://docs.cypress.io/guides/getting-started/installing-cypress.html#npm-install)
- `public`: Static files, see ["Static file serving](https://nextjs.org/docs/basic-features/static-file-serving)
- `src`: Source code of the app
    - `Components`: React components
        - `__snapshots__`: Folder used by Jest when using [Snapshot testing](https://jestjs.io/docs/en/snapshot-testing)
        - `svg`: SVG components, imported from `src/svg`
    - `gql`: GraphQL queries, partials, etc.
    - `pages`: Next.js pages, see ["Pages"](https://nextjs.org/docs/basic-features/pages)
    - `propTypes`: Shared propTypes (for re-usability)
    - `svg`: Contains both `.svg` files and their react `.tsx` version. When a SVG is converted to a TSX component, it should then be copied to `src/components/svg` to be used within the app.
    - `types`: Shared types (for re-usability)
        - `data`: Types that are data-related, basically those that are related to a database record
    - `utils`: Various utilities

---

# License

MIT

---

# Vulnerability disclosure

[See our policy](https://github.com/UnlyEd/Unly).

---

# Contributors and maintainers

This project is being maintained by:
- [Unly] Ambroise Dhenain ([Vadorequest](https://github.com/vadorequest)) **(active)**

Special thanks to:
- [Contributor] Hugo Martin ([Demmonius](https://github.com/Demmonius)) - Github Actions CI/CD pipeline

---

# **[ABOUT UNLY]** <a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" height="40" align="right" alt="Unly logo" title="Unly logo" /></a>

> [Unly](https://unly.org) is a socially responsible company, fighting inequality and facilitating access to higher education.
> Unly is committed to making education more inclusive, through responsible funding for students.

We provide technological solutions to help students find the necessary funding for their studies.

We proudly participate in many TechForGood initiatives. To support and learn more about our actions to make education accessible, visit :
- https://twitter.com/UnlyEd
- https://www.facebook.com/UnlyEd/
- https://www.linkedin.com/company/unly
- [Interested to work with us?](https://jobs.zenploy.io/unly/about)

Tech tips and tricks from our CTO on our [Medium page](https://medium.com/unly-org/tech/home)!

#TECHFORGOOD #EDUCATIONFORALL
