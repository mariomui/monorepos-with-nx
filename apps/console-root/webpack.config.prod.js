const withModuleFederation = require('@nrwl/react/module-federation');
const moduleFederationConfig = require('./module-federation.config');
const { merge } = require('webpack-merge');
const { writeFileSync } = require('fs');
const { join } = require('path');

const federatedWebpack = withModuleFederation({
  ...moduleFederationConfig,
  remotes: [['remotes-counter', 'http://localhost:4201/']],
});

const polyfillConfig = {
  mode: 'production',
};
const configureWritePath = (rootPath, { env, name }) => {
  const path = join(
    rootPath,
    `debugs/debug-webpack-config-${env}-${name}.json`
  );
  console.log({ path });
  return path;
};
const isDebugEnv = process.env?.DEBUG_ENV === 'true';
module.exports = new Promise((resolve) =>
  federatedWebpack.then((fn) => {
    resolve((config, context) => {
      const mergedConfig = fn(merge(config, polyfillConfig));
      if (isDebugEnv) {
        console.log(mergedConfig);
        try {
          writeFileSync(
            configureWritePath('./', {
              env: context.configuration,
              name: mergedConfig.output.uniqueName,
            }),
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
