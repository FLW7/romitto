import ym from 'react-yandex-metrika';

import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export const trackAddToCart = (item: ICartOrderItem) => {
  if (ym !== undefined) {
    try {
      ym('reachGoal', 'addPlate-Sellkit', {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.countInCart,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
