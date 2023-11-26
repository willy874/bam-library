export function getGlobalObject() {
  // eslint-disable-next-line no-undef
  if (typeof window !== 'undefined') return window;
  // eslint-disable-next-line no-undef
  if (typeof global !== 'undefined') return global;
  // eslint-disable-next-line no-undef
  if (typeof self !== 'undefined') return self;
  // eslint-disable-next-line no-undef
  if (typeof globalThis !== 'undefined') return globalThis;
  return {};
}
