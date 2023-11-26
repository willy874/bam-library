export async function executeAsyncFunctions<T = any>(funcs: ((param?: T) => Promise<T>)[], init?: T) {
  if (init) {
    let result: T = init;
    while (funcs.length) {
      const [func] = funcs.splice(0, 1);
      result = await func(result);
    }
    return result;
  } else {
    while (funcs.length) {
      const [func] = funcs.splice(0, 1);
      await func();
    }
  }
}
