/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  extends: [
    '@bam-library',
    'plugin:@bam-library/prettier',
    'plugin:@bam-library/typescript',
    'plugin:@bam-library/react',
  ],
  env: {
    browser: true,
  },
};
