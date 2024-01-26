import { IFormattedUser, formatUserEntity } from '@modules/user/utils';
import { Order } from '../infra/typeorm/entities/Order';
import { IOrderMetatada } from '../interfaces/IOrderMetatada';
import { IFormattedStore, formatStoreEntity } from '@modules/store/utils/formatStoreEntity';

export interface IFormattedOrder {
  id: string;
  readable_id: number;
  store_id: string;
  user_id: string;
  status: string;
  metadata: IOrderMetatada[];
  created_at: Date;
  updated_at: Date;
  store: IFormattedStore;
  user: IFormattedUser;
}

type FuncType = (entity: Order) => IFormattedOrder;

export const formatOrderEntity: FuncType = entity => ({
  id: entity.id,
  readable_id: entity.readable_id,
  store_id: entity.store_id,
  user_id: entity.user_id,
  status: entity.status,
  metadata: entity.metadata,
  created_at: entity.created_at,
  updated_at: entity.updated_at,
  store: entity.store ? formatStoreEntity(entity.store) : ({} as any),
  user: entity.user ? formatUserEntity(entity.user) : ({} as any),
});
