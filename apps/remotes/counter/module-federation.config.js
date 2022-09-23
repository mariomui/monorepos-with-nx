module.exports = {
  name: '$remote_counter',
  exposes: {
    './Module': './src/remoteEntry.js',
  },
};
