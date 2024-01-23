import { Container } from 'typedi';
/** PROVIDERS IMPORTS */
import StorageProvider from './providers/StorageProvider/implementations/StorageProvider';
import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';

import HashProvider from './providers/HashProvider/implementations/HashProvider';
import IHashProvider from './providers/HashProvider/models/IHashProvider';

import IGoogleProvider from './providers/GoogleProvider/models/IGoogleProvider';
import GoogleProvider from './providers/GoogleProvider/implementations/GoogleProvider';

/** REPOSITORY IMPORTS */
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';

import { StoreRepository } from '@modules/store/infra/typeorm/repositories/StoreRepository';
import { IStoreRepository } from '@modules/store/repositories/IStoreRepository';

import { StoreMenuItemRepository } from '@modules/store/infra/typeorm/repositories/StoreMenuItemRepository';
import { IStoreMenuItemRepository } from '@modules/store/repositories/IStoreMenuItemRepository';

import { OrderRepository } from '@modules/order/infra/typeorm/repositories/OrderRepository';
import { IOrderRepository } from '@modules/order/repositories/IOrderRepository';

/** PROVIDERS DECLARATION */
Container.set<IStorageProvider>('StorageProvider', new StorageProvider());
Container.set<IHashProvider>('HashProvider', new HashProvider());
Container.set<IGoogleProvider>('GoogleProvider', new GoogleProvider());

/** REPOSITORY DECLARATION */
Container.set<IUserRepository>('UserRepository', new UserRepository());
Container.set<IStoreRepository>('StoreRepository', new StoreRepository());
Container.set<IStoreMenuItemRepository>('StoreMenuItemRepository', new StoreMenuItemRepository());
Container.set<IOrderRepository>('OrderRepository', new OrderRepository());
