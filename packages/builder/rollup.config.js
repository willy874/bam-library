const path = require('path');
const fs = require('fs');
const alias = require('@rollup/plugin-alias');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve');
const esbuild = require('rollup-plugin-esbuild');
const dts = require('rollup-plugin-dts');

const NODEJS_EXTERNALS = [
  'default',
  'assert',
  'async_hooks',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'crypto',
  'diagnostics_channel',
  'dns',
  'domain',
  'fs',
  'fs/promises',
  'http',
  'http2',
  'https',
  'inspector',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'sys',
  'timers',
  'tls',
  'trace_events',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'worker_threads',
  'zlib',
];

const rootPath = process.cwd();

const pkgPath = path.resolve(rootPath, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

function createAlias(options) {
  return options.map((data) => {
    return {
      find: data.find,
      replacement: data.replacement,
      customResolver: (target) => {
        return data.resolve.map((p) => `${target}${p}`).find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
      },
    };
  });
}
const external = [
  ...NODEJS_EXTERNALS,
  /^node:/,
  ...Object.keys(pkg?.dependencies || {}),
  ...Object.keys(pkg?.peerDependencies || {}),
];

const aliasPlugin = () => {
  return alias.default({
    entries: createAlias([
      {
        find: /^@\/(.*)/,
        replacement: path.resolve(rootPath, 'src', '$1'),
        resolve: ['.ts', '/index.ts'],
      },
    ]),
  });
};

module.exports = [
  {
    input: path.resolve(rootPath, 'src/main.ts'),
    output: {
      file: path.resolve(rootPath, 'dist/lib/main.common.js'),
      format: 'cjs',
      interop: 'auto',
      exports: 'named',
      footer: 'module.exports = Object.assign(exports.default || {}, exports);',
      sourcemap: true,
    },
    plugins: [
      aliasPlugin(),
      resolve.default(),
      commonjs.default(),
      json.default(),
      esbuild.default({
        sourceMap: true,
        target: 'es2015',
        tsconfig: path.resolve(rootPath, 'tsconfig.json'),
      }),
    ],
    external,
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/types/main.d.ts',
      format: 'esm',
    },
    plugins: [aliasPlugin(), dts.default()],
    external,
  },
];
