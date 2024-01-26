import { IFormattedOrder, formatOrderEntity } from '@modules/order/utils/formatOrderEntity';
import { User } from '../infra/typeorm/entities/User';
import { IAddress } from '@shared/interfaces';

export interface IFormattedUser {
  id: string;
  name: string;
  email: string;
  address: IAddress;
  birthdate: Date;
  phone: string;
  orders: IFormattedOrder[];
}

type FuncType = (entity: User) => IFormattedUser;

export const formatUserEntity: FuncType = entity => ({
  id: entity.id,
  name: entity.name,
  email: entity.email,
  address: entity.address,
  birthdate: entity.birthdate,
  phone: entity.phone,
  orders: entity.orders?.length ? entity.orders.map(formatOrderEntity) : [],
});
