import { WebpackPluginInstance, Compiler } from 'webpack';
import { rollup } from 'rollup';
import rollupDts from 'rollup-plugin-dts';
import rollupAlias from '@rollup/plugin-alias';

function iaNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

interface DtsWebpackPluginOptions {
  output?: string;
}

export class DtsWebpackPlugin implements WebpackPluginInstance {
  options: DtsWebpackPluginOptions = {};
  constructor(options: DtsWebpackPluginOptions = {}) {
    this.options = options;
  }
  async apply(compiler: Compiler) {
    const entry = compiler.options.entry;
    const entryMap = typeof entry === 'function' ? await entry() : entry;
    const inputEntries = Object.entries(entryMap)
      .map(([, value]) => value.import || [])
      .flat();
    const alias = compiler.options.resolve.alias;
    const aliasMap = Array.isArray(alias)
      ? Object.fromEntries(alias.map(({ name, alias }) => [name, alias]))
      : alias || {};
    const aliasEntries = Object.entries(aliasMap)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => (v ? { find: key, replacement: v } : null)).filter(iaNotNull);
        }
        if (value) {
          return [{ find: key, replacement: value }];
        }
        return [];
      })
      .flat();
    await rollup({
      input: inputEntries,
      plugins: [
        rollupDts(),
        rollupAlias({
          entries: aliasEntries,
        }),
      ],
    }).then((bundle) => {
      return bundle.write({
        dir: this.options.output || 'dist/types',
        format: 'es',
      });
    });
  }
}
