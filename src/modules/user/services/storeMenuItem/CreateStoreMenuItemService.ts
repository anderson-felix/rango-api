import { Inject, Service } from 'typedi';

import { IStoreMenuItemRepository } from '@modules/store/repositories/IStoreMenuItemRepository';
import { ICreateStoreMenuItemDTO } from '@modules/store/dtos/IStoreMenuItemDTO';
import { IFormattedStoreMenuItem, formatStoreMenuItemEntity } from '@modules/store/utils/formatStoreMenuItemEntity';
import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';
import { LocaleError } from '@shared/errors/LocaleError';

@Service()
export class CreateStoreMenuItemService {
  constructor(
    @Inject('StoreRepository')
    private storeRepository: IStoreRepository,

    @Inject('StoreMenuItemRepository')
    private storeMenuItemRepository: IStoreMenuItemRepository,
  ) {}

  public async execute(dto: ICreateStoreMenuItemDTO): Promise<IFormattedStoreMenuItem> {
    const store = await this.storeRepository.findById(dto.store_id);
    if (!store) throw new LocaleError(`storeNotFound`);

    const menuItem = await this.storeMenuItemRepository.create(dto);

    return formatStoreMenuItemEntity(menuItem);
  }
}
