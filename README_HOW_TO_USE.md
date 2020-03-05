<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>

How to use
===

> A step by step guide explaining how to use this project yourself, from installing requirements to deploying to production.

---

<!-- toc -->

- [Getting started](#getting-started)
  * [Super quick local installation (for local-only testing purpose, without Zeit account)](#super-quick-local-installation-for-local-only-testing-purpose-without-zeit-account)
  * [Online installation (on Zeit)](#online-installation-on-zeit)

<!-- tocstop -->

---

# Getting started

## Super quick local installation (for local-only testing purpose, without Zeit account)

> This assumes you've **cloned** the project on your own computer.
>
> Follow this guide **if you just want to try it out** on your local machine
>
> **Tip**: Using now@17+ is required for CI to work properly, but you don't care about that if you just want to get started quickly.

- Duplicate the [`.env.build.example`](./.env.build.example) and rename it `.env.build` _(this file is only used on your local computer)_
- `nvm use` - Selects the right node.js version based on our [`.nvmrc`](./.nvmrc) file
- `yarn add -D now@16.7.3`, now@17+ requires to be authenticated to Zeit in order to launch the project, even if only working locally, so you must use now@16 instead
- `yarn` - Installs all deps from [`package.json`](./package.json)
- `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
- That's it! The project now works on your local computer, and should be identical to the online demo
    - **Tip**: It's still using the demo GraphCMS/GraphQL endpoint
    - **Tip**: The default GraphCMS token is readonly, writes will fail

> **Tip**: You can start the project in **debug mode** (built-in for WebStorm only) [by running the WebStorm "Debug" configuration in debug mode](https://youtu.be/3vbkiRAT4e8)
>
> **Tip**: If there are tools that you don't need/like, read our [guide about how to remove them](README_HOW_TO_REMOVE.md).

---

## Online installation (on Zeit)

See https://github.com/UnlyEd/next-right-now/blob/master/README_HOW_TO_USE.md#online-installation-on-zeit

Steps are similar. This NRN-Admin doesn't use Locize though, so you can skip it.
