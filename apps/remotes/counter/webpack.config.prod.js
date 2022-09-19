const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');
// const { writeFile, writeFileSync } = require('fs');
// production file
const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
  // exposes: ['remotes-counter'],
});

const polyfillConfig = {
  mode: 'production',
  devtool: false,
};

// module.exports = new Promise((resolve) =>
//   federatedWebpack.then((fn) => {
//     resolve((config) => {
//       const mergedConfig = fn(merge(config, polyfillConfig));
//       // try {
//       //   writeFileSync('./webpper.json', JSON.stringify(mergedConfig));
//       // } catch (err) {
//       //   console.log(err, 'is error');
//       // }
//       return mergedConfig;
//     });
//   })
// );
module.exports = require('./webpack.config.js');

// https://github.com/nrwl/nx/issues/10485#issuecomment-1204102023
