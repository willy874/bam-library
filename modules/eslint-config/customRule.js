/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
      type: "suggestion",
      docs: {
          description: "Description of the rule",
      },
      fixable: "code",
      schema: [] // no options
  },
  // eslint-disable-next-line no-unused-vars
  create(_context) {
      return {
          // callback functions
      };
  }
};
