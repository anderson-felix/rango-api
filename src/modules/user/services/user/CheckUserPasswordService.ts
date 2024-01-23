import { Inject, Service } from 'typedi';

import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import HashProvider from '@shared/container/providers/HashProvider/implementations/HashProvider';

interface IRequest {
  email: string;
  password: string;
}

@Service()
export class CheckUserPasswordService {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,

    @Inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return false;

    return await this.hashProvider.compareHash(password, user.password);
  }
}
