import { User } from '@modules/user/infra/typeorm/entities/User';
import { logger } from './logger';

type FuncType = (user: User, action: string, metadata?: any) => void;

export const serviceLogger: FuncType = (user, action, metadata) => {
  const loggedUser = { id: user.id, name: user.name, email: user.email };

  logger.info(
    `|--SERVICE_LOGGER--|\n__action: ${action}\n__loggedUser: ${JSON.stringify(loggedUser, null, 4)}\n__metadata: ${
      metadata ? JSON.stringify(metadata, null, 4) : null
    }`,
  );

  // TODO: Save logs in redis or mongodb
};
