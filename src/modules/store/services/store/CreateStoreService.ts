import { Inject, Service } from 'typedi';

import { ICreateStoreDTO } from '@modules/store/dtos/IStoreDTO';
import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';
import { IFormattedStore, formatStoreEntity } from '@modules/store/utils/formatStoreEntity';

@Service()
export class CreateStoreService {
  constructor(
    @Inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(dto: ICreateStoreDTO): Promise<IFormattedStore> {
    const store = await this.storeRepository.create(dto);

    return formatStoreEntity(store);
  }
}
