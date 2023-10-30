/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  extends: ['@bam-library', 'plugin:@bam-library/prettier', 'plugin:@bam-library/typescript'],
  overrides: [
    {
      files: ['packages/base/*'],
      env: {
        node: false,
        browser: false,
      },
    },
    {
      files: ['packages/browser/*'],
      env: {
        node: false,
        browser: true,
      },
    },
    {
      files: ['packages/common/*'],
      env: {
        node: true,
        browser: true,
      },
    },
  ],
};
