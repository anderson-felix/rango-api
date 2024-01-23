import { Inject, Service } from 'typedi';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@modules/user/infra/typeorm/entities/User';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import { LocaleError } from '@shared/errors/LocaleError';
import { formatUserEntity, IFormattedUser } from '@modules/user/utils/formatUserEntity';

interface IRequest {
  new_password: string;
  old_password: string;
  user: User;
}

@Service()
export class UpdateUserPasswordService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user: _user, old_password, new_password }: IRequest): Promise<IFormattedUser> {
    const user = await this.userRepository.findByEmail(_user.email); // Request necessary to get the password field
    if (!user) throw new LocaleError('userNotFound');

    const passwordMatched = await this.hashProvider.compareHash(old_password, user.password);
    if (!passwordMatched) throw new LocaleError('passwordDoesNotMatch');
    const hashedPassword = await this.hashProvider.generateHash(new_password);

    user.password = hashedPassword;

    await this.userRepository.save(user);

    return formatUserEntity(user);
  }
}
