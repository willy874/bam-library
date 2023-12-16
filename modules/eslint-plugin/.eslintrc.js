/**
 * @type {import('@bam-library/eslint-config').ESLintConfigExport}
 */
module.exports = {
  extends: ['@bam-library', require.resolve('./prettier')],
};
