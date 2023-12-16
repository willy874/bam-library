export async function executeAsyncFunctions<T = any>(
  funcs: ((param: T) => Promise<T>)[],
  init: T,
  onError?: (error: any) => void,
) {
  let result = init as T;
  while (funcs.length) {
    const [func] = funcs.splice(0, 1);
    try {
      result = await func(result);
    } catch (error) {
      onError?.(error);
    }
  }
  return result;
}
