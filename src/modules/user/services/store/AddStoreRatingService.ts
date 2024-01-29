import { Inject, Service } from 'typedi';

import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';
import { IFormattedStore, formatStoreEntity } from '@modules/store/utils/formatStoreEntity';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { LocaleError } from '@shared/errors/LocaleError';
import { IRating } from '@modules/store/interfaces/IRating';

interface IRequest {
  user: User;
  store_id: string;
  rating?: number;
  liked?: boolean;
}

@Service()
export class AddStoreRatingService {
  constructor(
    @Inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute({ user, rating, store_id, liked }: IRequest): Promise<IFormattedStore> {
    const store = await this.storeRepository.findById(store_id, { menu: true });
    if (!store) throw new LocaleError(`storeNotFound`);

    const userRating = store.rating.find(e => e.user_id === user.id);

    const dto: IRating = { user_id: user.id };

    if (liked !== undefined) dto.liked = liked;
    if (rating !== undefined) dto.value = `${rating}`;

    if (!userRating) store.rating.push(dto);
    else {
      if (dto.liked !== undefined) userRating.liked = dto.liked;
      if (dto.value !== undefined) userRating.value = dto.value;
    }

    await this.storeRepository.save(store);

    return formatStoreEntity(store);
  }
}
