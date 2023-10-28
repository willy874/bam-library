export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return [0, 'Bytes'] as const;
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]] as const;
}

export function formatQueryParams(query: Record<string, string | string[] | undefined>) {
  return Object.keys(query).reduce<string[][]>((acc, key) => {
    const value = query[key];
    if (value !== undefined) {
      if (Array.isArray(value)) {
        return [...acc, ...value.map((v) => [key, v])];
      } else {
        return [...acc, [key, value]];
      }
    }
    return acc;
  }, []);
}
