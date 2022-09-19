const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');
const { join } = require('path');
const { logger } = require('@nrwl/devkit');

const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
  // remember not to overwrite remotes here as module federation comes with default for development,
});

const polyfillConfig = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  watch: true,
  watchOptions: {
    poll: 1000,
  },
  devServer: {
    liveReload: true,
    // hot: false,
    compress: true,
    client: {
      overlay: {
        warnings: true,
      },
    },
  },
};

module.exports = new Promise((resolve) =>
  federatedWebpack.then((fn) => {
    resolve((config, context) => {
      logger.info({ env: context.configuration });
      const _config = fn(merge(config, polyfillConfig));
      console.log({ devServerBefore: _config.devServer });
      // you can manually insert to config here but the merge webpack function is much smarter
      _config.devServer.hot = false;
      console.log({ devServerAfter: _config.devServer });
      return _config;
    });
  })
);

// https://github.com/nrwl/nx/issues/10485#issuecomment-1204102023

// https://stackoverflow.com/questions/72926559/nx-react-module-federation-hot-reload
