<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>

How to remove "X" library/utility
===

> Explanation about how to remove any lib/utility you don't need/like

<!-- toc -->

- [Amplitude](#amplitude)
- [Emotion](#emotion)
- [Sentry](#sentry)

<!-- tocstop -->

---

## Amplitude

> You can use other alternative libraries for analytics.
>
> We've experimented with Google Analytics and were really disappointed by it.
> Amplitude is much better, both for configuring the events, documenting them and exploit them. But it's much more expensive.

1. Remove the following libraries:
    - [`amplitude-js`](https://www.npmjs.com/package/amplitude-js): Top-level amplitude official lib, used by react-amplitude.
    - [`@amplitude/react-amplitude`](https://www.npmjs.com/package/react-amplitude): React-friendly amplitude lib, non-officially maintained. Really useful when working with react.

1. Remove their components usage in the source code
1. Remove the `AMPLITUDE_API_KEY` env var

---

## Emotion

> We strongly recommend to keep Emotion. You can use both Styled Component approach and inline styles, it should feet all needs.

1. Remove the following libraries:
    - [`@emotion/core`](https://emotion.sh/docs/css-prop): Necessary to use emotion, with built-in `css` notation support.
    - [`@emotion/styled`](https://emotion.sh/docs/styled): Necessary to used the `styled` notation.
    - [`emotion-theming`](https://www.npmjs.com/package/emotion-theming): Theming library inspired by styled-components
1. Remove their components usage in the source code + `/** @jsx jsx */`

---

## Sentry

> You may replace Sentry by another monitoring tool of your choice. Make sure it is JS universal-friendly though.

1. Remove the following libraries:
    - [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser): Package to use from the browser.
    - [`@sentry/node`](https://www.npmjs.com/package/@sentry/node): Package to use from the server.
1. Remove their components usage in the source code
1. Remove the `SENTRY_DSN` env var
1. Remove alias in [next.config.js](next.config.js) `config.resolve.alias['@sentry/node'] = '@sentry/browser';`
