const { componentBuilder } = require('@bam/builder');
const { dts } = require('rollup-plugin-dts');
const path = require('path');
const fs = require('fs');

const CWD = process.cwd();

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

module.exports = componentBuilder({
  alias: {
    entries: createAlias([
      {
        find: /^@\/(.*)/,
        replacement: path.resolve(CWD, 'src', '$1'),
        resolve: ['.ts', '/index.ts'],
      },
      {
        find: /^@styled\/(.*)/,
        replacement: path.resolve(CWD, 'styled-system', '$1'),
        resolve: ['.mjs', '/index.mjs', '.js', '/index.js'],
      },
    ]),
  },
  rollupConfiguration: [
    {
      external: [/react\/*/],
    },
    {
      input: 'src/main.ts',
      output: {
        file: 'dist/types/main.d.ts',
        format: 'esm',
      },
      plugins: [dts()],
    },
  ],
});
