import pino from 'pino';
import pretty from 'pino-pretty';
import pinoHttp from 'pino-http';

const prettyLogger = pretty({
  ignore: 'pid,hostname',
  colorize: true,
  singleLine: true,
  translateTime: 'yyyy-mm-dd HH:MM:ss',
});

export const logger = pino(prettyLogger as pino.LoggerOptions);

export const httpLogger = pinoHttp({
  logger: logger as any,
  customSuccessObject: (req, res, val) => {
    return {
      ...val,
      body: (req as any)?.body || {},
      eventCode: res.statusCode < 300 ? 'REQUEST_PROCESSED' : 'REQUEST_FAILED',
    };
  },
  customErrorObject: (req, res, error, val) => {
    return {
      ...val,
      body: (req as any)?.body || {},
      eventCode: 'REQUEST_FAILED',
    };
  },
});
