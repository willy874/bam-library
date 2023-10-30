/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  extends: ['@bam-library', require.resolve('./prettier')],
};
