import { EventFunction, RecordKeyType } from '@/utils/types';
import { Abstract } from '../interface';
import { ClassType } from '../constants';

export class EventBus implements Abstract.EventBus {
  #queue: Record<RecordKeyType, EventFunction[] | undefined> = {};
  #map: WeakMap<EventFunction, EventFunction> = new WeakMap();

  toString(): string {
    return ClassType.EVENT_BUS;
  }

  #set(event: RecordKeyType, callback: EventFunction): void {
    const queue = this.#queue[event];
    if (queue) {
      this.#queue[event] = queue.concat(callback);
    } else {
      this.#queue[event] = [callback];
    }
  }

  #remove(event: RecordKeyType, callback: EventFunction): void {
    const queue = this.#queue[event];
    if (queue) {
      this.#queue[event] = queue.filter((cb) => cb !== callback);
      this.#map.delete(callback);
    }
  }

  on(event: RecordKeyType, listener: (...args: any[]) => void, once = false): () => void {
    const callback = (...args: any[]): void => {
      listener(...args);
      if (once) {
        this.#remove(event, callback);
      }
    };
    this.#set(event, callback);
    this.#map.set(listener, callback);
    let isOff = false;
    return () => {
      if (isOff) return;
      this.#remove(event, callback);
      isOff = true;
    };
  }

  off(event: RecordKeyType, listener: EventFunction): void {
    const callback = this.#map.get(listener);
    if (callback) {
      this.#remove(event, callback);
    }
  }

  emit(event: RecordKeyType, ...args: any[]): void {
    const queue = this.#queue[event];
    if (queue) {
      queue.forEach((cb) => cb(...args));
    }
  }

  eventCount(event: RecordKeyType): number {
    return this.#queue[event]?.length ?? 0;
  }
}

export class DefineEventBus<M extends Record<RecordKeyType, EventFunction>> {
  current = new EventBus();

  on<K extends keyof M>(event: K, listener: M[K], once = false): () => void {
    return this.current.on(event, listener, once);
  }

  off<K extends keyof M>(event: K, listener: M[K]): void {
    this.current.off(event, listener);
  }

  emit<K extends keyof M>(event: K, ...args: Parameters<M[K]>): void {
    this.current.emit(event, ...args);
  }

  eventCount<K extends keyof M>(event: K): number {
    return this.current.eventCount(event);
  }
}

export const isEventBus = (value: unknown): value is Abstract.EventBus => {
  return String(value) === ClassType.EVENT_BUS;
};
