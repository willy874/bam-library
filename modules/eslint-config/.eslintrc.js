/**
 * @type {import('eslint').ESLint.Options}
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
  }
};
