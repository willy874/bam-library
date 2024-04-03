/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  extends: ['@bam', 'plugin:@bam/prettier', 'plugin:@bam/typescript'],
  overrides: [
    {
      files: ['packages/core/**/*.ts'],
      env: {
        node: false,
        browser: false,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
    {
      files: ['packages/browser/**/*.ts'],
      env: {
        node: false,
        browser: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
};
