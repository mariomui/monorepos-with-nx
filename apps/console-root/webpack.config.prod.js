const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');
// const { writeFile, writeFileSync } = require('fs');

const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
  remotes: [['remotes-counter', 'http://localhost:4201/']],
});

const polyfillConfig = {
  mode: 'production',
};

module.exports = new Promise((resolve) =>
  federatedWebpack.then((fn) => {
    resolve((config) => {
      const mergedConfig = fn(merge(config, polyfillConfig));
      // try {
      //   writeFileSync('./webpper.json', JSON.stringify(mergedConfig));
      // } catch (err) {
      //   console.log(err, 'is error');
      // }
      return mergedConfig;
    });
  })
);

// https://github.com/nrwl/nx/issues/10485#issuecomment-1204102023
