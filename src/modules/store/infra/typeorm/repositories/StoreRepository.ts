import { Repository } from 'typeorm';
import { Service } from 'typedi';

import { AppDataSource } from '@shared/infra/typeorm';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { formatPagingResponse } from '@shared/utils';
import { ICreateStoreDTO } from '@modules/store/dtos/IStoreDTO';
import { Store } from '../entities/Store';
import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';

@Service()
export class StoreRepository implements IStoreRepository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Store);
  }

  public async create(data: ICreateStoreDTO, manager = this.ormRepository.manager) {
    const entity = this.ormRepository.create(data);

    await manager.save(entity);

    return entity;
  }

  public async save(entity: Store, manager = this.ormRepository.manager) {
    return await manager.save(entity);
  }

  public async remove(entity: Store, manager = this.ormRepository.manager) {
    await manager.remove(entity);
  }

  public async findById(id: string, relations = {}) {
    return await this.ormRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async find(paging: IPagingTypeORM) {
    paging.relations = ['menu'];
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }
}
