import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Container } from 'typedi';

import authConfig from '@config/auth';
import { CheckInUserService } from '@modules/user/services/user';
import { LocaleError } from '@shared/errors/LocaleError';

interface TokenPayload {
  int: number;
  exp: number;
  sub: string;
}

const UserAuth = async (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new LocaleError('missingToken');
  }

  const [, token] = authHeader.split(' ');
  let id;

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;
    id = sub;
  } catch {
    throw new LocaleError('invalidToken');
  }

  const checkIn = Container.get(CheckInUserService);
  req.user = await checkIn.execute(id);

  if (req.user.disabled_at) throw new LocaleError('userTemporarilyDisabled');
};

export default async function authUser(req: Request, _: Response, next: NextFunction) {
  await UserAuth(req);
  next();
}

authUser.teacher = async (req: Request, _: Response, next: NextFunction) => {
  await UserAuth(req);
  if (req.user.role !== 'teacher') throw new LocaleError('userNotAuthorized');
  next();
};

authUser.parent = async (req: Request, _: Response, next: NextFunction) => {
  await UserAuth(req);
  if (req.user.role !== 'parent') throw new LocaleError('userNotAuthorized');
  next();
};

authUser.student = async (req: Request, _: Response, next: NextFunction) => {
  await UserAuth(req);
  if (req.user.role !== 'student') throw new LocaleError('userNotAuthorized');
  next();
};

authUser.notStudent = async (req: Request, _: Response, next: NextFunction) => {
  await UserAuth(req);
  if (req.user.role === 'student') throw new LocaleError('userNotAuthorized');
  next();
};
