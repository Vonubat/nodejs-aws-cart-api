import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { CartStatuses } from '../../cart/models';
import { CartItemEntity } from './cart-item.entity';

@Entity('carts')
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt!: string;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  items: CartItemEntity[];
}
