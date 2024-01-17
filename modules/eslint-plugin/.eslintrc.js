/**
 * @type {import('@bam/eslint-config').ESLintConfigExport}
 */
module.exports = {
  extends: ['@bam', require.resolve('./prettier')],
};
