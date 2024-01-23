import { EntityManager, FindOptionsRelations } from 'typeorm';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import { ICreateStoreMenuItemDTO } from '../dtos/IStoreMenuItemDTO';
import { StoreMenuItem } from '../infra/typeorm/entities/StoreMenuItem';

export interface IStoreMenuItemRepository {
  create(data: ICreateStoreMenuItemDTO, manager?: EntityManager): Promise<StoreMenuItem>;
  save(data: StoreMenuItem, manager?: EntityManager): Promise<StoreMenuItem>;
  remove(data: StoreMenuItem, manager?: EntityManager): Promise<void>;
  findById(id: string, relations?: FindOptionsRelations<StoreMenuItem>): Promise<StoreMenuItem | null>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<StoreMenuItem>>;
  findByName(name: string, relations?: FindOptionsRelations<StoreMenuItem>): Promise<StoreMenuItem | null>;
}
