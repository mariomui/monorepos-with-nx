const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../../package.json').dependencies;

module.exports = (config, context) => {
  return {
    ...config,
    mode: 'development',
    output: {
      ...config.output,
      publicPath: 'http://localhost:4200/',
    },
    optimization: {
      ...config.optimization,
      runtimeChunk: false,
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'console-root',
        remotes: {
          'remotes-counter':
            'remotes-counter@http://localhost:4201/remoteEntry.js',
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
