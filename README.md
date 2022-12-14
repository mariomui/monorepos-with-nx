
# Bookspear

Takeaways:
react:module-federaton-server
this starts up the remotes and host all at once, rather in seperate terminals

## Before You Start Developing

* create a .env in your root folder
  * ask the KeyMaster for the URL link and password to supabase
    * (eventually this will be deprecated for custom auth)

## For devs

### Running the backend, frontend, db

* running dev manually.
  * app
    * `npm run nx -- run console-root:serve`,
  * OSI8 protocol layer
    * `npm run nx -- run api:serve`,
  * tools to architect/view data layer
    * `npm run nx -- run models:prisma-studio`,
* using the start:dev script for ez access

### Creating a feature

* Create an app
  * Run `nx g @nrwl/react:app my-app` to generate an application.
  * expose it as a remote and use it as whatever.
    * check out the viability of exposing your types to the host application. If not just use redefine. Put it in the mfe-shared/types lib when you have the chance (make the mfe shared types lib)

## gotchas

* Your chrome extensions might eff up
  * Loom extension sucks
  * Natural Reader Text To Speech

## Below is legacy ignore

---

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@bookspear/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ??? Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx???s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

{
  x: '@testing-library/react',
  a: { singleton: true, strictVersion: true, requiredVersion: '13.3.0' }
}
{
  x: '@emotion/styled',
  a: { singleton: true, strictVersion: true, requiredVersion: '11.10.4' }
}
{
  x: 'react',
  a: { singleton: true, strictVersion: true, requiredVersion: '18.2.0' }
}
{
  x: 'react-dom',
  a: { singleton: true, strictVersion: true, requiredVersion: '18.2.0' }
}
{
  x: '@nrwl/react',
  a: { singleton: true, strictVersion: true, requiredVersion: '14.7.5' }
}
{
  x: 'react-router-dom',
  a: { singleton: true, strictVersion: true, requiredVersion: '6.3.0' }
}
{
  x: 'core-js',
  a: { singleton: true, strictVersion: true, requiredVersion: '^3.6.5' }
}
{
  x: 'regenerator-runtime',
  a: { singleton: true, strictVersion: true, requiredVersion: '0.13.7' }
}
