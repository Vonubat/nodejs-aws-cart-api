import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return 0; // temporary

  // return cart
  //   ? cart.items.reduce(
  //       (acc: number, { product: { price }, count }: CartItem) => {
  //         return (acc += price * count);
  //       },
  //       0,
  //     )
  //   : 0;
}
