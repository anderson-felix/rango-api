import { Repository } from 'typeorm';
import { Service } from 'typedi';

import { AppDataSource } from '@shared/infra/typeorm';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { formatPagingResponse } from '@shared/utils';
import { ICreateOrderDTO } from '@modules/order/dtos/IOrderDTO';
import { Order } from '../entities/Order';
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository';

@Service()
export class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  public async create(data: ICreateOrderDTO, manager = this.ormRepository.manager) {
    const entity = this.ormRepository.create(data);
    await manager.save(entity);

    return entity;
  }

  public async save(entity: Order, manager = this.ormRepository.manager) {
    return await manager.save(entity);
  }

  public async remove(entity: Order, manager = this.ormRepository.manager) {
    await manager.remove(entity);
  }

  public async findById(id: string, relations = {}) {
    return await this.ormRepository.findOne({ where: { id }, relations });
  }

  public async find(paging: IPagingTypeORM) {
    paging.relations = [`store`, `store.menu`, `user`];
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }
}
