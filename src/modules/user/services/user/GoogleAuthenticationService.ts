import { sign } from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import authConfig from '@config/auth';
import { LocaleError } from '@shared/errors/LocaleError';
import { formatUserEntity, IFormattedUser } from '@modules/user/utils/formatUserEntity';
import IGoogleProvider from '@shared/container/providers/GoogleProvider/models/IGoogleProvider';

interface IRequest {
  identifier: string;
}

interface IResponse {
  access_token: string | null;
  user: IFormattedUser | null;
  unregistered?: boolean;
}

@Service()
export class GoogleAuthenticationService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('GoogleProvider')
    private googleProvider: IGoogleProvider,
  ) {}

  public async execute({ identifier }: IRequest): Promise<IResponse> {
    const googleUser = await this.googleProvider.getUser(identifier);
    if (!googleUser) throw new LocaleError('invalidLogin');

    let user = await this.userRepository.findByEmail(googleUser.email);
    if (!user) user = await this.userRepository.create({ name: googleUser.name, email: googleUser.email, birthdate: null, password: '', phone: '' });

    if (user.disabled_at) throw new LocaleError('userTemporarilyDisabled');

    const { secret, expiresIn } = authConfig.jwt;

    const access_token = sign({}, secret, { subject: user.id, expiresIn });
    user.sso_data ||= {};
    user.sso_data.google = { id: googleUser.id, expires: Date.now() + 1000 * 60 * 60, token: identifier };

    await this.userRepository.save(user);

    return { user: formatUserEntity(user), access_token };
  }
}
