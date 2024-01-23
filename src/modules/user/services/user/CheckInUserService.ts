import { Inject, Service } from 'typedi';

import { LocaleError } from '@shared/errors/LocaleError';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

@Service()
export class CheckInUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string) {
    const user = await this.userRepository.checkIn(id);
    if (!user) throw new LocaleError('userNotFound');

    return user;
  }
}
