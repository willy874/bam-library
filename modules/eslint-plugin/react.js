/**
 * @type {import('@bam/eslint-config').ESLintConfigExport}
 */
module.exports = {
  plugins: ['react'],
  extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
