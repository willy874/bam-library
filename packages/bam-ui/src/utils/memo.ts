import React from 'react';
import { isEqual } from '@bam/lodash';

export function useDeepMemo<T>(newValue: T): T {
  const valueRef = React.useRef<T>(newValue);
  if (valueRef.current === valueRef) {
    return valueRef.current;
  }
  if (isEqual(valueRef.current, newValue)) {
    valueRef.current = newValue;
  }
  return valueRef.current;
}

export function useJsonMemo<T>(value: T): T {
  const json = JSON.stringify(value);
  return React.useMemo(() => JSON.parse(json), [json]);
}
