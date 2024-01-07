import webpack from 'webpack';

export function build() {
  return webpack({});
}

export { componentBuilder } from './component/defineConfig';
export { applicationBuilder } from './application/defineConfig';

export default function builder() {}
