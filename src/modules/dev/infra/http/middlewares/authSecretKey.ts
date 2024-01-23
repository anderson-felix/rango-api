import { Request, Response, NextFunction } from 'express';

import { LocaleError } from '@shared/errors/LocaleError';
import { validateSecretKey } from '@modules/dev/utils/validateSecretKey';

export default async function authSecretKey(request: Request, _: Response, next: NextFunction) {
  const valid = validateSecretKey(request.params.secret);

  if (!valid) throw new LocaleError('tokenExpired');

  return next();
}
