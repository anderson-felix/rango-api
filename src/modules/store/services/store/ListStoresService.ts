import { Inject, Service } from 'typedi';

import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';
import { IFormattedStore, formatStoreEntity } from '@modules/store/utils/formatStoreEntity';

@Service()
export class ListStoresService {
  constructor(
    @Inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(): Promise<IFormattedStore[]> {
    const store = await this.storeRepository.find({ where: {} });

    return store.results.map(formatStoreEntity);
  }
}
