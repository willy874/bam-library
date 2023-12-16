/**
 * @type {import('@bam-library/eslint-config').ESLintConfigExport}
 */
module.exports = {
  plugins: ['prettier'],
  extends: ['prettier', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', require('@bam-library/prettier-config')],
  },
};
