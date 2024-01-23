import { Inject, Service } from 'typedi';

import { formatUserEntity, IFormattedUser } from '@modules/user/utils/formatUserEntity';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

@Service()
export class ValidateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(user: User): Promise<IFormattedUser> {
    const fullUser = await this.userRepository.findById(user.id, { orders: { store: true } });
    return formatUserEntity(fullUser as User);
  }
}
