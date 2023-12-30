/**
 * @type {import('./types').ESLintConfigExport}
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  ignorePatterns: ['node_modules', 'dist'],
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-dupe-class-members': 'off',
  }
};
