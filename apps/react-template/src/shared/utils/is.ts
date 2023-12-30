import * as Core from '../core';

export function isRecordKeyType(value: unknown): value is Core.RecordKeyType {
  return typeof value === 'string' || typeof value === 'symbol' || typeof value === 'number';
}
