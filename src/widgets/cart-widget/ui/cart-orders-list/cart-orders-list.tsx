/* eslint-disable @typescript-eslint/naming-convention */
import { useCart } from '../../state';

import styles from './style.module.css';

import CartGiftItem from '@/entities/cart-gift-item/cart-gift-item';
import CartOrderItem from '@/feature/cart-order-item/cart-order-item';

const CartOrdersList: React.FC<{ min?: boolean }> = ({ min }) => {
  const { orders, gifts, GiftName } = useCart();

  return (
    orders?.length > 0 && (
      <ul className={styles.itemsList}>
        {orders.map((item, key) => {
          return <CartOrderItem key={key} item={item} min={min} />;
        })}
        {gifts.map((item, key) => {
          const { id, name, weight, picture } = item;

          return (
            <CartGiftItem
              key={key}
              id={id}
              name={name}
              weight={weight}
              picture={picture}
            />
          );
        })}
        {GiftName && <CartGiftItem name={GiftName} />}
      </ul>
    )
  );
};

export default CartOrdersList;
