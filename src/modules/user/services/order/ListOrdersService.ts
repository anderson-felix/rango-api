import { Inject, Service } from 'typedi';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository';
import { IFormattedOrder, formatOrderEntity } from '@modules/order/utils/formatStoreEntity';

@Service()
export class ListOrdersService {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(user: User): Promise<IFormattedOrder[]> {
    const orders = await this.orderRepository.find({ where: { user_id: user.id }, relations: [`store`] });

    return orders.results.map(formatOrderEntity);
  }
}
