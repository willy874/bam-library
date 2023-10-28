const replaceSlash = (path: string) => path.replace(/\/+/g, '/');

type FileInfo = {
  type?: 'file';
  name: string;
};

type DirectoryInfo = {
  type?: 'directory';
  name: string;
  children?: Array<DirectoryInfo | FileInfo>;
};

function isFolder(value: unknown): value is DirectoryInfo {
  if (value && typeof value === 'object') {
    if ('children' in value && Array.isArray(value.children)) {
      return true;
    }
    if ('type' in value && value.type === 'directory') {
      return true;
    }
  }
  return false;
}

export function findItemByPath(path: string) {
  const paths = replaceSlash(path).split('/');
  const recursive = (dir: DirectoryInfo, path: string[]): FileInfo | DirectoryInfo | null => {
    const [name, ...rest] = path;
    const isLast = rest.length === 0;
    const target = dir.children?.find((p) => p.name === name);
    if (!target) {
      return null;
    }
    if (target.type === 'directory') {
      return isLast ? target : recursive(target, rest);
    }
    if (target.type === 'file' && isLast) {
      return target;
    }
    return null;
  };
  if (path === '/') {
    return this.current;
  }
  const isFolderPath = /\/$/.test(path);
  return recursive(this.current, paths.slice(1, paths.length - Number(isFolderPath)));
}

export const treeToArrayByPath = <T extends DirectoryInfo | FileInfo>(data: T, path: string): T[] => {
  if (!isFolder(data)) {
    return [];
  }
  const folderPaths = path === '/' ? [''] : replaceSlash(path).split('/');
  return folderPaths.reduce(
    (acc, _, index, arr) => {
      const lastFolder = acc[acc.length - 1];
      const f = lastFolder.children?.find((p) => p.name === arr[index + 1]);
      return f && isFolder(f) ? acc.concat(f as any) : acc;
    },
    [data]
  );
};
