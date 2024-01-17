/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  extends: ['@bam', 'plugin:@bam/prettier', 'plugin:@bam/typescript'],
  overrides: [
    {
      files: ['packages/base/**/*.ts'],
      env: {
        node: false,
        browser: false,
      },
    },
    {
      files: ['packages/browser/**/*.ts'],
      env: {
        node: false,
        browser: true,
      },
    },
    {
      files: ['packages/common/**/*.ts'],
      env: {
        node: true,
        browser: true,
      },
    },
  ],
};
