import { buildFileLocation } from '@shared/utils';
import { Store } from '../infra/typeorm/entities/Store';
import { IFormattedStoreMenuItem, formatStoreMenuItemEntity } from './formatStoreMenuItemEntity';

export interface IFormattedStore {
  id: string;
  display_name: string;
  address: string;
  profile_pic: string;
  logo: string;
  segments: string[];
  created_at: Date;
  updated_at: Date;
  menu: IFormattedStoreMenuItem[];
  rating_average: string;
  users_liked: string[];
}

type FuncType = (entity: Store) => IFormattedStore;

export const formatStoreEntity: FuncType = entity => ({
  id: entity.id,
  display_name: entity.display_name,
  address: entity.address,
  profile_pic: buildFileLocation(entity.profile_pic),
  logo: buildFileLocation(entity.logo),
  segments: entity.segments,
  created_at: entity.created_at,
  updated_at: entity.updated_at,
  menu: entity.menu?.length ? entity.menu.map(item => formatStoreMenuItemEntity(item)) : [],
  rating_average: entity.rating?.length
    ? String(entity.rating.filter(e => !!e.value).reduce((acc, rating) => (acc += Number(rating.value)), 0) / entity.rating.length)
    : `0`,
  users_liked: entity.rating?.filter(r => !!r.liked).map(r => r.user_id),
});
