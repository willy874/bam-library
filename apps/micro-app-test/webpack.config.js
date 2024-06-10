const { applicationBuilder } = require('@bam/builder');

module.exports = applicationBuilder({
  moduleFederation: {
    name: 'reactTemplate',
    filename: 'remoteEntry.js',
    exposes: {
      './App': './src/App',
    },
    library: { type: 'var', name: 'reactTemplate' },
  },
});
