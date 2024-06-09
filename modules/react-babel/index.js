'use strict';

const create = require('./create');

module.exports = function (api, opts) {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'production';
  return create(api, opts, env);
};
