import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from './Store';

@Entity('store_menu_item')
export class StoreMenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: `uuid` })
  store_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Store, store => store.menu)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store;
}
