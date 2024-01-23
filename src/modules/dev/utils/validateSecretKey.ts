import { generateSecretKey } from './generateSecretKey';

type FuncType = (secret: string) => boolean;

export const validateSecretKey: FuncType = secret => {
  const [, timestamp] = secret.split('-');
  const limit = 1000 * 60 * 5;

  const expired = Number(timestamp) + limit < Date.now();

  const rawSecret = generateSecretKey(Number(timestamp));

  return rawSecret === secret && !expired;
};
