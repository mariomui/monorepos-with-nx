module.exports = {
  name: 'counter',
  exposes: {
    './Module': './src/remote-entry',
  },
};
