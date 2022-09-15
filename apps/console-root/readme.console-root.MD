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
