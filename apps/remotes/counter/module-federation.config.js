module.exports = {
  name: 'remotes-counter',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
