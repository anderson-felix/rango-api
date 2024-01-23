import { Inject, Service } from 'typedi';

import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';
import { IFormattedStore, formatStoreEntity } from '@modules/store/utils/formatStoreEntity';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { LocaleError } from '@shared/errors/LocaleError';

interface IRequest {
  user: User;
  store_id: string;
  rating: number;
}

@Service()
export class AddStoreRatingService {
  constructor(
    @Inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute({ user, rating, store_id }: IRequest): Promise<IFormattedStore> {
    const store = await this.storeRepository.findById(store_id);
    if (!store) throw new LocaleError(`storeNotFound`);

    const userRating = store.rating.find(e => e.user_id === user.id);

    if (userRating) userRating.value = `${rating}`;

    await this.storeRepository.save(store);

    return formatStoreEntity(store);
  }
}
