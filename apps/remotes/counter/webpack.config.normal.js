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
        name: 'counter',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/app/app.tsx',
        },
        shared: {
          ...deps,
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
