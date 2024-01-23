import { EntityManager, FindOptionsRelations } from 'typeorm';

import { ICreateUserDTO } from '@modules/user/dtos/IUserDTO';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';

export interface IUserRepository {
  create(data: ICreateUserDTO, manager?: EntityManager): Promise<User>;
  save(entity: User, manager?: EntityManager): Promise<User>;
  save(entity: User[], manager?: EntityManager): Promise<User[]>;
  checkIn(id: string): Promise<User | null>;
  findById(id: string, relations?: FindOptionsRelations<User>): Promise<User | null>;
  findAll(paging: IPagingTypeORM): Promise<IPagingResponse<User>>;
  findByEmail(email: string, softDelete?: boolean): Promise<User | null>;
  delete(entity: User, manager?: EntityManager): Promise<void>;
}
