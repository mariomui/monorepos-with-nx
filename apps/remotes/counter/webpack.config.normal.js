const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../../../package.json').dependencies;
const path = require('path');

module.exports = (config, context) => {
  const directory = '././../../../dist/apps/remotes/counter';
  console.log({ config, directory });
  console.log({
    main: config.entry.main,
    plugin: JSON.stringify(config.plugins.slice(-1)),
    extens: config.resolve.extensions,
    devServer: config.devServer,
  });
  console.log({ deps });
  const nodedeps = ['express, @prisma/client'];
  const eagerDeps = ['react', 'react-dom', 'react-router-dom'];
  const donotInclude = [''];
  const _deps = Object.entries(deps)
    .map(([name, version]) => {
      if (donotInclude.includes(name)) return null;
      if (nodedeps.includes(name)) return null;
      if (eagerDeps.includes(name)) {
        return {
          [name]: {
            singleton: true,
            requiredVersion: version,
            eager: true,
          },
        };
      }
      return {
        [name]: {
          singleton: true,
          requiredVersion: version,
        },
      };
    })
    .filter((pkg) => pkg !== null);
  return {
    ...config,
    mode: 'development',
    output: {
      ...config.output,
      publicPath: 'auto',
      clean: true,
    },
    // devServer: {
    //   ...config.devServer,
    //   static: {
    //     directory,
    //   },
    //   historyApiFallback: true,
    // },
    optimization: {
      ...config.optimization,
      runtimeChunk: false,
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: '$remote_counter',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/app/app.tsx',
        },
        shared: {
          ...deps,
          lodash: '*',
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
    ],
  };
};
