import { Inject, Service } from 'typedi';

import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';

@Service()
export class CheckUserEmailService {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  public async execute(email: string): Promise<{ is_valid: boolean }> {
    const user = await this.userRepository.findByEmail(email);

    return { is_valid: !user };
  }
}
