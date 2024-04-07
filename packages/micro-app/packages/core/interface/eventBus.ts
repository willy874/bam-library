import { EventFunction, RecordKeyType } from '@/utils/types';

export interface EventBus {
  on(event: RecordKeyType, listener: EventFunction, once?: boolean): () => void;
  off(event: RecordKeyType, listener: EventFunction): void;
  emit(event: RecordKeyType, ...args: any[]): void;
  eventCount(event: RecordKeyType): number;
}

export interface DefineEventBus<M extends Record<RecordKeyType, EventFunction>> {
  on<K extends keyof M>(event: K, listener: M[K], once?: boolean): () => void;
  off<K extends keyof M>(event: K, listener: M[K]): void;
  emit<K extends keyof M>(event: K, ...args: Parameters<M[K]>): void;
  eventCount<K extends keyof M>(event: K): number;
}
