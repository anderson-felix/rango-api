import { FindOptionsRelations, Repository } from 'typeorm';
import { Service } from 'typedi';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { formatPagingResponse, getEntityFields } from '@shared/utils';
import { AppDataSource } from '@shared/infra/typeorm';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/user/dtos/IUserDTO';
import { User } from '../entities/User';

@Service()
export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async create(data: ICreateUserDTO, manager = this.ormRepository.manager) {
    const entity = this.ormRepository.create(data);

    return await manager.save(entity);
  }

  public async save<T extends User>(data: T, manager = this.ormRepository.manager) {
    return await manager.save(data);
  }

  public async checkIn(id: string) {
    // auth method
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findById(id: string, relations?: FindOptionsRelations<User>) {
    return await this.ormRepository.findOne({ where: { id }, relations });
  }

  public async findAll(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);
    return formatPagingResponse(paging, response);
  }

  public async findByEmail(email: string, withDeleted = false) {
    return await this.ormRepository.findOne({
      where: { email },
      withDeleted,
      select: getEntityFields(User) as (keyof User)[],
    });
  }

  public async delete(entity: User, manager = this.ormRepository.manager) {
    entity.deleted_at = new Date();

    await manager.save(entity);
  }
}
