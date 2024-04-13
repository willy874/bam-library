const { applicationBuilder } = require('@bam/builder');

module.exports = applicationBuilder({
  moduleFederation: {
    name: 'reactTemplate',
    filename: 'remoteEntry.js',
    exposes: {
      './App': './src/App',
    },
    library: { type: 'var', name: 'reactTemplate' },
    shared: {
      react: { singleton: true, requiredVersion: '^18.2.0', eager: true },
      'react-dom': { singleton: true, requiredVersion: '^18.2.0', eager: true },
      lodash: '^4.17.21',
    },
  },
});
