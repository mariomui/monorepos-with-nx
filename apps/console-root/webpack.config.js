const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../../package.json').dependencies;

module.exports = (config, context) => {
  return {
    ...config,
    mode: 'development',
    output: {
      ...config.output,
      publicPath: 'auto',
      // publicPath: 'http://localhost:4200/',
      clean: true,
    },
    optimization: {
      ...config.optimization,
      runtimeChunk: false,
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'console-root',
        filename: 'remoteEntry.js',
        remotes: {
          $remote_counter:
            '$remote_counter@http://localhost:4201/remoteEntry.js',
        },
        shared: {
          // ...deps,
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
