const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');
const { writeFile, writeFileSync } = require('fs');

// development file
const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
});

const polyfillConfig = {
  devtool: false,
};

module.exports = new Promise((resolve) =>
  federatedWebpack.then((fn) => {
    resolve((config) => {
      const _config = fn(merge(config, polyfillConfig));
      try {
        writeFileSync('./webpack-counter.json', JSON.stringify(_config));
      } catch (err) {
        console.log(err);
      }
      return _config;
    });
  })
);

// https://github.com/nrwl/nx/issues/10485#issuecomment-1204102023
