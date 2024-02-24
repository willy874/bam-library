const { componentBuilder } = require('@bam/builder');
const { dts } = require('rollup-plugin-dts');

const packageNames = ['base', 'browser', 'node', 'common'];

module.exports = async () => {
  const builders = packageNames.map((packageName) => {
    return componentBuilder({
      esmOutput: {
        dir: `dist/${packageName}/esm`,
      },
      cjsOutput: {
        dir: `dist/${packageName}/cjs`,
      },
      rollupConfiguration: [
        {
          input: `packages/${packageName}/src/main.ts`,
        },
        {
          input: `packages/${packageName}/src/main.ts`,
          output: {
            file: `dist/${packageName}/types/main.d.ts`,
            format: 'esm',
          },
          plugins: [dts()],
        },
      ],
    });
  });
  const results = await Promise.all(builders.map((build) => build()));
  return results.flat();
};
