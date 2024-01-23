import { EntityManager, FindOptionsRelations } from 'typeorm';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import { Order } from '../infra/typeorm/entities/Order';
import { ICreateOrderDTO } from '../dtos/IOrderDTO';

export interface IOrderRepository {
  create(data: ICreateOrderDTO, manager?: EntityManager): Promise<Order>;
  save(data: Order, manager?: EntityManager): Promise<Order>;
  remove(data: Order, manager?: EntityManager): Promise<void>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Order>>;
  findById(id: string, relations?: FindOptionsRelations<Order>): Promise<Order | null>;
}
