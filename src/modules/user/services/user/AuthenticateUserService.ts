import { sign } from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import authConfig from '@config/auth';
import { LocaleError } from '@shared/errors/LocaleError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { formatUserEntity, IFormattedUser } from '@modules/user/utils/formatUserEntity';

interface IRequest {
  identifier: string;
  password: string;
}

interface IResponse {
  access_token: string;
  user: IFormattedUser;
}

@Service()
export class AuthenticateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ identifier, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(identifier);
    if (!user) throw new LocaleError('invalidLogin');

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);
    if (!passwordMatched) throw new LocaleError('invalidLogin');

    if (user.disabled_at) throw new LocaleError('userTemporarilyDisabled');

    const { secret, expiresIn } = authConfig.jwt;

    const access_token = sign({}, secret, { subject: user.id, expiresIn });

    return { user: formatUserEntity(user), access_token };
  }
}
