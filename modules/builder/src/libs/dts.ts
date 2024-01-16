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

function getEntryMapByCompiler(compiler: Compiler) {
  const entry = compiler.options.entry;
  const entryMap = typeof entry === 'function' ? entry() : entry;
  return entryMap;
}
function getAliasMapByCompiler(config: Compiler) {
  const alias = config.options.resolve.alias;
  const aliasMap = Array.isArray(alias)
    ? Object.fromEntries(alias.map(({ name, alias }) => [name, alias]))
    : alias || {};
  return aliasMap;
}

export class DtsWebpackPlugin implements WebpackPluginInstance {
  options: DtsWebpackPluginOptions = {};
  constructor(options: DtsWebpackPluginOptions = {}) {
    this.options = options;
  }
  async apply(compiler: Compiler) {
    const entryMap = getEntryMapByCompiler(compiler);
    const inputEntries = Object.entries(entryMap)
      .map(([, value]) => value.import || [])
      .flat();
    const aliasMap = getAliasMapByCompiler(compiler);
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
