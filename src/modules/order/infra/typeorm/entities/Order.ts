import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Store } from '@modules/store/infra/typeorm/entities/Store';
import { User } from '@modules/user/infra/typeorm/entities/User';
import { IOrderMetatada } from '@modules/order/interfaces/IOrderMetatada';
import { OrderStatusType } from '@modules/order/interfaces/OrderStatusType';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  readable_id: number;

  @Column({ type: `uuid` })
  store_id: string;

  @Column({ type: `uuid` })
  user_id: string;

  @Column({ type: `text` })
  status: OrderStatusType;

  @Column()
  address: string;

  @Column({ type: `json` })
  metadata: IOrderMetatada[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Store, store => store.orders)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
