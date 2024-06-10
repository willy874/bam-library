/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  overrides: [
    {
      files: ['.eslintrc.js'],
      extends: ['@bam', 'plugin:@bam/prettier'],
    },
    {
      files: ['**/nx.json', '**/project.json', '**/workspace.json'],
      env: {
        node: true,
      },
      plugins: ['@nx'],
      extends: ['plugin:@nx/typescript'],
    },
  ],
};
