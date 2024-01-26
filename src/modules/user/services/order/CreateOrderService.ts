import { Inject, Service } from 'typedi';

import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { LocaleError } from '@shared/errors/LocaleError';
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository';
import { IOrderMetatada } from '@modules/order/interfaces/IOrderMetatada';
import { IFormattedOrder, formatOrderEntity } from '@modules/order/utils/formatOrderEntity';

interface IRequest {
  user: User;
  items: IOrderMetatada[];
  store_id: string;
}

@Service()
export class CreateOrderService {
  constructor(
    @Inject('StoreRepository')
    private storeRepository: IStoreRepository,

    @Inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ user, items, store_id }: IRequest): Promise<IFormattedOrder> {
    const store = await this.storeRepository.findById(store_id);
    if (!store) throw new LocaleError(`storeNotFound`);

    const order = await this.orderRepository.create({ store_id, user_id: user.id, items });

    order.store = store;
    order.user = user;

    return formatOrderEntity(order);
  }
}
