import { EntityManager, FindOptionsRelations } from 'typeorm';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import { Store } from '../infra/typeorm/entities/Store';
import { ICreateStoreDTO } from '../dtos/IStoreDTO';

export interface IStoreRepository {
  create(data: ICreateStoreDTO, manager?: EntityManager): Promise<Store>;
  save(data: Store, manager?: EntityManager): Promise<Store>;
  remove(data: Store, manager?: EntityManager): Promise<void>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Store>>;
  findById(id: string, relations?: FindOptionsRelations<Store>): Promise<Store | null>;
}
