import { FindOptionsRelations, Repository } from 'typeorm';
import { Service } from 'typedi';

import { AppDataSource } from '@shared/infra/typeorm';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { formatPagingResponse } from '@shared/utils';
import { StoreMenuItem } from '../entities/StoreMenuItem';
import { IStoreMenuItemRepository } from '@modules/store/repositories/IStoreMenuItemRepository';
import { ICreateStoreMenuItemDTO } from '@modules/store/dtos/IStoreMenuItemDTO';

@Service()
export class StoreMenuItemRepository implements IStoreMenuItemRepository {
  private ormRepository: Repository<StoreMenuItem>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(StoreMenuItem);
  }

  public async create(data: ICreateStoreMenuItemDTO, manager = this.ormRepository.manager) {
    const entity = this.ormRepository.create(data);

    await manager.save(entity);

    return entity;
  }

  public async save(entity: StoreMenuItem, manager = this.ormRepository.manager) {
    return await manager.save(entity);
  }

  public async remove(entity: StoreMenuItem, manager = this.ormRepository.manager) {
    await manager.remove(entity);
  }

  public async findById(id: string, relations?: FindOptionsRelations<StoreMenuItem>) {
    return await this.ormRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async find(paging: IPagingTypeORM) {
    paging.relations = ['books'];
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findByName(name: string, relations?: FindOptionsRelations<StoreMenuItem>) {
    return await this.ormRepository.findOne({
      where: { name },
      relations,
    });
  }
}
