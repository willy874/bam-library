import * as Core from '../core';
import { Binder } from './Binder';
import { EventEmitter } from 'events';
import { isRecordKeyType } from './is';

export class Registry<B extends Record<Core.RecordKeyType, unknown>> extends EventEmitter implements Core.Registry<B> {
  #map: Map<Core.RecordKeyType, Core.Binder> = new Map();

  constructor(private readonly bindingMap: Partial<B> = {} as B) {
    super();
  }

  binding<T extends keyof B>(name: T): Core.Binder<T, Core.AutoBindToHandler<B>[T]>;
  binding(name: Core.RecordKeyType): Core.Binder;
  binding(name: unknown): Core.Binder {
    if (isRecordKeyType(name)) {
      if (this.hasBinding(name as Core.RecordKeyType)) {
        throw new Error(`Binding for ${String(name)} already exists`);
      }
      return new Binder(name as Core.RecordKeyType);
    }
    throw new Error(`Invalid binding name is not a string or symbol`);
  }

  unbind<T extends keyof T>(target: T): boolean;
  unbind(target: Core.RecordKeyType): boolean;
  unbind(target: Core.Binder): boolean;
  unbind(target: unknown): boolean {
    if (target instanceof Binder) {
      return this.#map.delete(target.name);
    }
    if (isRecordKeyType(target)) {
      return this.#map.delete(target as keyof B);
    }
    return false;
  }

  hasBinding<T extends keyof T>(target: T): boolean;
  hasBinding(target: Core.RecordKeyType): boolean;
  hasBinding(target: unknown): boolean {
    if (target instanceof Binder) {
      return this.#map.has(target.name);
    }
    return this.#map.has(target as keyof B);
  }

  lookup<T extends keyof B>(name: T): Core.Binder<T, Core.AutoBindToHandler<B>[T]>;
  lookup(name: Core.RecordKeyType): Core.Binder {
    if (isRecordKeyType(name)) {
      const binder = this.#map.get(name);
      if (binder) return binder;
    }
    throw new Error(`Invalid binding name is not a string or symbol`);
  }

  clear(): void {
    this.#map.clear();
  }
}
