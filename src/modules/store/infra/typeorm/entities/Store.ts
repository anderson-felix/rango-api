import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { StoreMenuItem } from './StoreMenuItem';
import { Order } from '@modules/order/infra/typeorm/entities/Order';
import { IRating } from '@modules/store/interfaces/IRating';

@Entity('store')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  display_name: string;

  @Column()
  address: string;

  @Column()
  profile_pic: string;

  @Column()
  logo: string;

  @Column({ type: `json` })
  segments: string[];

  @Column({ type: `json` })
  rating: IRating[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => StoreMenuItem, item => item.store)
  menu: StoreMenuItem[];

  @OneToMany(() => Order, order => order.store)
  orders: Order[];
}
