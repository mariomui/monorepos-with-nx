module.exports = {
  name: 'console-root',
  remotes: ['counter'],
  shared: (x, a) => {
    console.log({ x, a });
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
