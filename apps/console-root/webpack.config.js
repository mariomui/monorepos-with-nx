const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');

const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
  // remember not to overwrite remotes here as module federation comes with default for development
});

const polyfillConfig = {};

module.exports = new Promise((resolve) =>
  federatedWebpack.then((fn) => {
    resolve((config) => fn(merge(config, polyfillConfig)));
  })
);

// https://github.com/nrwl/nx/issues/10485#issuecomment-1204102023
