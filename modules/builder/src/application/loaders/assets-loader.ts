import { RuleSetRule } from '@/types/webpack';
import type { DefaultSettings } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function getAssetLoaders(options: RuleSetRule[], _settings: DefaultSettings) {
  return [
    ...options,
    {
      test: /\.(svg|png|jpe?g|gif|webp|woff2?|eot|[ot]tf)$/i,
      type: 'asset/resource',
    },
  ];
}
