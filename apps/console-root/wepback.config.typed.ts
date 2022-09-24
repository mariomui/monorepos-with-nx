// Impossible to use esm to download webpack
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { dependencies: deps } = require('./package.json');
const ModuleFederationPlugin = require('webpack').container;
function config(config: any, context: any) {
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
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
    ],
  };
}
export { config as default };
