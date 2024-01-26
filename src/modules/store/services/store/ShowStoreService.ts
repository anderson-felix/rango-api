import { Inject, Service } from 'typedi';

import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';
import { IFormattedStore, formatStoreEntity } from '@modules/store/utils/formatStoreEntity';
import { LocaleError } from '@shared/errors/LocaleError';

@Service()
export class ShowStoreService {
  constructor(
    @Inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(id: string): Promise<IFormattedStore> {
    const store = await this.storeRepository.findById(id, { menu: true });
    if (!store) throw new LocaleError(`storeNotFound`);

    return formatStoreEntity(store);
  }
}
