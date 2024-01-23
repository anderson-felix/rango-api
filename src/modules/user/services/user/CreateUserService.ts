import { Inject, Service } from 'typedi';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { LocaleError } from '@shared/errors/LocaleError';
import { IFormattedUser, formatUserEntity } from '@modules/user/utils';
import { ICreateUserDTO } from '@modules/user/dtos/IUserDTO';

@Service()
export class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(dto: ICreateUserDTO): Promise<IFormattedUser> {
    const userWithSameEmail = await this.userRepository.findByEmail(dto.email, true);
    if (userWithSameEmail) throw new LocaleError('emailAlreadyExists');

    const hashedPassword = await this.hashProvider.generateHash(dto.password);

    dto.password = hashedPassword;

    const user = await this.userRepository.create(dto);

    return formatUserEntity(user);
  }
}
