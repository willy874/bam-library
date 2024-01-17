/**
 * @type {import('@bam/eslint-config').ESLintConfigExport}
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
