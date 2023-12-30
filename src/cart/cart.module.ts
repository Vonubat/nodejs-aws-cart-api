import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from '../db/entities/cart-item.entity';
import { CartEntity } from '../db/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    OrderModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
