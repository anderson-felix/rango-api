import mime from 'mime-types';

type FuncType = (mimetype?: string) => string;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const getMatchedCharacters = (item: string, index: number) =>
  index % 3
    ? item
    : letters.charAt(Math.round(Math.random() * (letters.length - 1)));

export const filenameGenerator: FuncType = mimetype => {
  const filename = Date.now()
    .toString()
    .split('')
    .map(getMatchedCharacters)
    .join('');

  return mimetype ? `${filename}.${mime.extension(mimetype)}` : filename;
};
