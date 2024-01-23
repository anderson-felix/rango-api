type FuncType = (url: string) => string;

export const getFileNameFromUrl: FuncType = url => {
  const nameAndQuery = url.split('/').slice(-1).toString();

  return nameAndQuery.split('?').slice(0, 1).toString();
};
