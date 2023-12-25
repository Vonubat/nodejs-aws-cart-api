import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Cart, CartStatuses } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../../db/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async findByUserId(userId: string): Promise<CartEntity> {
    const foundedCart: CartEntity | null = await this.cartRepository.findOne({
      where: { userId },
      relations: {
        items: true,
      },
    });

    console.log('userId', userId);
    console.log('foundedCart', foundedCart);

    return foundedCart;
  }

  async createByUserId(userId: string): Promise<CartEntity> {
    const userCart = {
      userId,
      items: [],
      status: CartStatuses.OPEN,
    };

    const newCart = this.cartRepository.save(userCart);

    return newCart;
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    const foundedCart = await this.findByUserId(userId);

    if (foundedCart) {
      return foundedCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<CartEntity> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    await this.cartRepository.update(id, updatedCart);

    return updatedCart as unknown as CartEntity;
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}
