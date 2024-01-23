import { Service } from 'typedi';

import { formatUserEntity, IFormattedUser } from '@modules/user/utils/formatUserEntity';
import { User } from '@modules/user/infra/typeorm/entities/User';

@Service()
export class ShowUserProfileService {
  public async execute(user: User): Promise<IFormattedUser> {
    return formatUserEntity(user);
  }
}
