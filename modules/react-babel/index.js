// require('babel-preset-react-app');

const fn = function (api, opts) {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  return require('./babel')(api, opts, env);
};

module.exports = Object.assign(fn, { default: fn })
