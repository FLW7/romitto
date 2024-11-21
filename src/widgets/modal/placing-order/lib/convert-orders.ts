/* eslint-disable unicorn/no-array-reduce */
import { type IOrderItemNew } from '../api/create-order';

import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export const convertOrders = (orders: ICartOrderItem[]) => {
  const groupedOrders = orders.reduce<Record<string, IOrderItemNew[]>>((acc, order) => {
    const orderId = String(order.id);

    // Создаем копию объекта acc, чтобы избежать прямого изменения параметра функции
    const updatedAcc = { ...acc };

    // Преобразование modifiers
    const modifiedModifiers = order.modifiers?.map((modifier) => ({
      id: modifier.id,
      items: modifier.items.map((item) => item.id),
      counts: modifier.items.map((item) => item.count ?? 1),
    }));

    // Создаем объект заказа в соответствии с новой схемой
    const newOrder = {
      id: order.id,
      comment: order.comment ?? '',
      countInCart: order.countInCart,
      modifiers: modifiedModifiers,
    };

    if (updatedAcc[orderId]) {
      updatedAcc[orderId].push(newOrder);
    } else {
      updatedAcc[orderId] = [newOrder];
    }

    return updatedAcc;
  }, {});

  return groupedOrders;
};
