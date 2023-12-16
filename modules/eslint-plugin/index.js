/**
 * @type {import('@bam-library/eslint-config').ESLintConfigExport}
 */
module.exports = {
  configs: {
    prettier: require('./prettier'),
    typescript: require('./typescript'),
    react: require('./react'),
  },
};
