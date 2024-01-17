/**
 * @type {import('@bam/eslint-config').ESLintConfigExport}
 */
module.exports = {
  configs: {
    prettier: require('./prettier'),
    typescript: require('./typescript'),
    react: require('./react'),
  },
};
