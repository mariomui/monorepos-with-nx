module.exports = {
  name: 'console-root',
  remotes: [['remotes-counter', '//localhost:4201']],
  shared: (x, a) => {
    console.log({ x });
    return a;
  },
};
// { x: '@testing-library/react' }
// { x: '@emotion/styled' }
// { x: 'react' }
// { x: 'react-dom' }
// { x: '@nrwl/react' }
// { x: 'react-router-dom' }
// { x: 'core-js' }
// { x: 'regenerator-runtime' }
// { x: 'webpack-bundle-analyzer' }
