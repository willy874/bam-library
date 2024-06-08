const { componentBuilder } = require('@bam/builder');
const { dts } = require('rollup-plugin-dts');

module.exports = componentBuilder({
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
