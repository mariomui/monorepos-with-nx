# Notes

* cli commands
  * npx nx g @nrwl/react:app is the standard way to create a react app
  * npx nx g @nrwl/react:host is the standard way to create a shell
  * npx nx g @nrwl/react:remote is the standard way to create the remotes
* context
  * going from barebones standard to see all the configurations of a host and remote is useful for understanding.

## Custom webpack with module federation

* the custom webpack on the documentation site is wrong.
  * async await is currently not supported.
  * withModuleFedration returns a promise
    * `export declare function withModuleFederation(options: ModuleFederationConfig): Promise<(config: any) => any>;`
      * so the result is a promise that returns a function
        * (config) => whatever. <-- configFn
        * ```js
          wmf = withModuleFederation({})
          wmf.then(configFn => {
            // here is where previous knowledge appears.
            // what does webpack WANT from a webpack config.
            // https://webpack.js.org/configuration/configuration-types/#exporting-a-promise
            /*
            i'm alsmot tempted to 
            m.es = () => new Promsie(res => {
              const newConfig = merge(config, overrides)
              const _me = configfn(newConfig)
              res(me) 
            })
            */

          })
          ```

## Different webpacks for build and dev

* consider another configuration for diagnosis.
* dont refactor too early, remember angular.
* npx nx console-root:build
  * this defautls to production which i have set up to devtool false so the dist can be READ in human readable js.
* nx nx console-root:serve
  * this defaults to development mode which i have made optimizations to true cuz the bundle is way to big and takes forever to hot reload.

## Dynamic import

* the main entry point is now the top level
* As such, it has to be a promise.
* gone are the good old days of static imports where you can crawl down the entire tree and grab all the stuff you want.
* <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import>
  * import(someModule)
    * this returns a promise
    * <https://nx.dev/packages/web/executors/webpack>
    * The name of the main entry-point file.
      * <https://webpack.js.org/concepts/entry-points/>
      * so if the main file is importing dynamically...
        * is that the same as ???
          * ```
            entry: {
              import: './boostrap'
            }
            ```
      * EntryDescription object properties.
        * dependOn: The entry points that the current entry point depends on. They must be loaded before this entry point is loaded.
        * filename: Specifies the name of each output file on disk.
        * import: Module(s) that are loaded upon startup.
        * library: Specify library options to bundle a library from current entry.
        * runtime: The name of the runtime chunk. When set, a new runtime chunk will be created. It can be set to false to avoid a new runtime chunk since webpack 5.43.0.
        * publicPath: Specify a public URL address for the output files of this entry when they are referenced in a browser. Also, see output.publicPath.

## shared libs and dependencies

// you can search the node_modules for npmPackages in
// function withModuleFederation(options) {
// and console.log the npm packages that are pulled into console root
```
{
  npmPackages: {
    '@testing-library/react': { singleton: true, strictVersion: true, requiredVersion: '13.3.0' },
    '@emotion/styled': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '11.10.4'
    },
    react: { singleton: true, strictVersion: true, requiredVersion: '18.2.0' },
    'react-dom': { singleton: true, strictVersion: true, requiredVersion: '18.2.0' },
    '@nrwl/react': { singleton: true, strictVersion: true, requiredVersion: '14.7.5' }
  }
}
```

<https://github.com/survivejs/webpack-merge>
<!-- there are other functions besides merge -->

## githu

(node:62445) [DEP_WEBPACK_WATCH_WITHOUT_CALLBACK] DeprecationWarning: A 'callback' argument needs to be provided to the 'webpack(options, callback)' function when the 'watch' option is set. There is no way to handle the 'watch' option without a callback.
    at webpack ($HOME/coding/projects/bookspear/bookspear/node_modules/webpack/lib/webpack.js:164:6)
    at f ($HOME/coding/projects/bookspear/bookspear/node_modules/webpack/lib/index.js:64:16)
    at Observable._subscribe ($HOME/coding/projects/bookspear/bookspear/node_modules/@nrwl/web/src/utils/run-webpack.js:40:33)
    at Observable._trySubscribe ($HOME/coding/projects/bookspear/bookspear/node_modules/rxjs/internal/Observable.js:44:25)
    at Observable.subscribe ($HOME/coding/projects/bookspear/bookspear/node_modules/rxjs/internal/Observable.js:30:22)
    at DoOperator.call ($HOME/coding/projects/bookspear/bookspear/node_modules/rxjs/internal/operators/tap.js:32:23)
    at Observable.subscribe ($HOME/coding/projects/bookspear/bookspear/node_modules/rxjs/internal/Observable.js:25:31)
    at MapOperator.call ($HOME/coding/projects/bookspear/bookspear/node_modules/rxjs/internal/operators/map.js:32:23)
    at Observable.subscribe ($HOME/coding/projects/bookspear/bookspear/node_modules/rxjs/internal/Observable.js:25:31)
    at eachValueFrom_1 ($HOME/coding/projects/bookspear/bookspear/node_modules/@nrwl/devkit/src/utils/rxjs-for-await.js:52:29)
```
Fix this bullshit when i get the chance

## HOT reload isnt working

* https://stackoverflow.com/questions/72926559/nx-react-module-federation-hot-reload
* https://github.com/nrwl/nx/issues/11089
* Not fixed since July
  * Most likely an issue with React-refresh-plugin not playing nice with WithModuleFederation
* Current fix is to disable HMR for development and use a hotreload
* Solution
  * its good to set logs
    * setting the client overlays for warnings in devServer allowed me to see that a token that react refresh needed is missing.
  * https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/176
    * 
  * https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md
  * enable the refresh
  * https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-typeof-globalthis
    * make sure your types are good for window and node having that $refresh token
