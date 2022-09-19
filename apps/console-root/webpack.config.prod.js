const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');
const { writeFileSync } = require('fs');

const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
  remotes: [['remotes-counter', 'http://localhost:4201/']],
});

const polyfillConfig = {
  mode: 'production',
};
const configureWritePath = (env, name) => {
  return `./debugs/debug-webpack-config-${env}-${name}.json`;
};
const isDebugEnv = process.env?.DEBUG_ENV === 'true';
module.exports = new Promise((resolve) =>
  federatedWebpack.then((fn) => {
    resolve((config, context) => {
      console.log({ context });
      const mergedConfig = fn(merge(config, polyfillConfig));
      if (isDebugEnv) {
        try {
          writeFileSync(
            configureWritePath(
              context.configuration,
              mergedConfig.output.uniqueName
            ),
            JSON.stringify(mergedConfig)
          );
        } catch (err) {
          console.log(err, 'is error');
        }
      }
      return mergedConfig;
    });
  })
);

// https://github.com/nrwl/nx/issues/10485#issuecomment-1204102023
