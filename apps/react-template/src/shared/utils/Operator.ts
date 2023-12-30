import * as Core from '../core';

export class Operator<T extends Record<Core.RecordKeyType, unknown>> {
  #registry?: Core.Registry<T>;

  get registry(): Core.Registry<T> {
    if (this.#registry) {
      return this.#registry;
    }
    throw new Error('Registry is not initialized');
  }

  init(registry: Core.Registry): () => void {
    this.#registry = registry;
    return () => {
      this.#registry = undefined;
    };
  }
}
