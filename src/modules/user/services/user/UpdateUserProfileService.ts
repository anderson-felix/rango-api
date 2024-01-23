import { Inject, Service } from 'typedi';

import { LocaleError } from '@shared/errors/LocaleError';
import { formatUserEntity, IFormattedUser } from '@modules/user/utils/formatUserEntity';
import { updateEntity } from '@shared/utils';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { IUpdateUserDTO } from '@modules/user/dtos/IUserDTO';

interface IRequest extends IUpdateUserDTO {
  user: User;
}

@Service()
export class UpdateUserProfileService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user, ...dto }: IRequest): Promise<IFormattedUser> {
    if (dto.email !== undefined && dto.email !== user.email) {
      const verifyEmail = await this.userRepository.findByEmail(dto.email);
      if (verifyEmail) throw new LocaleError('emailAlreadyExists');
    }

    updateEntity(user, dto);

    await this.userRepository.save(user);

    return formatUserEntity(user);
  }
}
