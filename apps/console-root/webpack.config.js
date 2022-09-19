const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');

const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
  // remember not to overwrite remotes here as module federation comes with default for development,
});

const polyfillConfig = {};

module.exports = new Promise((resolve) =>
  federatedWebpack.then((fn) => {
    resolve((config) => {
      const _config = fn(merge(config, polyfillConfig));
      // eslint-disable-next-line no-prototype-builtins
      if (_config?.devServer) {
        _config.devServer.compress = true;
      }
      return _config;
    });
  })
);

// https://github.com/nrwl/nx/issues/10485#issuecomment-1204102023
