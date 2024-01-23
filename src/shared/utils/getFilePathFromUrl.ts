type FuncType = (url: string) => string;

export const getFilePathFromUrl: FuncType = url =>
  url.split('?')[0]?.split('/').slice(-2).join('/');
