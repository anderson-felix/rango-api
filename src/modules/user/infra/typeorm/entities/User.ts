import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

import { IAddress, RecoveryToken, SSOData } from '@shared/interfaces';
import { Order } from '@modules/order/infra/typeorm/entities/Order';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  phone: string;

  @Column({ type: 'json' })
  address: IAddress;

  @Column({ type: 'json' })
  sso_data: SSOData;

  @Column({ type: 'json' })
  recovery_token: RecoveryToken;

  @Column({ type: 'timestamp' })
  birthdate: Date | null;

  @Column({ type: 'timestamp' })
  disabled_at: Date | null;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, order => order.store)
  orders: Order[];
}
