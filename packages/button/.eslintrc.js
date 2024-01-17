/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  extends: ['@bam', 'plugin:@bam/prettier', 'plugin:@bam/typescript', 'plugin:@bam/react'],
  env: {
    browser: true,
  },
};
