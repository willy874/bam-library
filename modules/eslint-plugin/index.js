/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  configs: {
    prettier: require('./prettier'),
    typescript: require('./typescript'),
    react: require('./react'),
  },
};
