import { StoreMenuItem } from '../infra/typeorm/entities/StoreMenuItem';
import { IFormattedStore, formatStoreEntity } from './formatStoreEntity';

export interface IFormattedStoreMenuItem {
  id: string;
  name: string;
  store_id: string;
  description: string;
  price: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  store: IFormattedStore;
}

type FuncType = (entity: StoreMenuItem) => IFormattedStoreMenuItem;

export const formatStoreMenuItemEntity: FuncType = entity => ({
  id: entity.id,
  name: entity.name,
  store_id: entity.store_id,
  description: entity.description,
  price: entity.price,
  image: entity.image,
  created_at: entity.created_at,
  updated_at: entity.updated_at,
  store: entity.store ? formatStoreEntity(entity.store) : ({} as any),
});
