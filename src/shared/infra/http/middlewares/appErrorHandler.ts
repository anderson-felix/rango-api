import { LocaleError } from '@shared/errors/LocaleError';
import { localeErrors } from '@shared/errors/localeErrors';
import { logger } from '@shared/utils';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const appErrorHandler = (err: any, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof LocaleError) {
    const error = localeErrors[err.type];
    const message = error.message[request.language];
    logger.error(`${error.status} - ${message}`);
    return response.status(error.status).json({ message, error: err.type });
  }

  const message = err?.message === undefined ? 'Unknown error.' : err.message;
  logger.error(JSON.stringify({ message }, null, 4));

  return response.status(400).json({ message });
};
