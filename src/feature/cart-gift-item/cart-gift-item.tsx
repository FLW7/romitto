import Image from 'next/image';

import type { TCartGiftItem } from '../../widgets/cart-widget/config';

import styles from './styles.module.css';

import PlusButton from '@/shared/components/plus-button';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { priceFormatter } from '@/shared/lib/price';
import { useCart } from '@/widgets/cart-widget/state';

interface TCartGiftItemProps {
  checked: boolean;
  disabled?: boolean;
}

const CartGiftItem: React.FC<TCartGiftItem & TCartGiftItemProps> = ({
  id,
  name,
  picture,
  weight,
  checked,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  delivery_type,
  minPrice,
  disabled,
}) => {
  const { addGift, deleteGift, giftsType, gifts } = useCart();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const addHandler = () => {
    addGift({ id, name, picture, weight, delivery_type, minPrice });
  };
  const removeHandler = () => {
    deleteGift(id);
  };

  return (
    <div className={styles.giftItem}>
      {disabled && (
        <div className={styles.disabledPlug}>
          <Typography variant='desc' className={styles.disabledPlug__text}>
            {giftsType === 3 && gifts.length > 0
              ? 'Вы уже выбрали подарок'
              : `Доступно при заказе от ${priceFormatter(minPrice)}`}
          </Typography>
        </div>
      )}
      {picture ? (
        <Image
          src={picture}
          width={126}
          height={126}
          className={`${styles.giftImage} ${disabled && 'opacity-50'}`}
          alt='rec-img'
        />
      ) : null}
      <div className={`${styles.container} ${disabled && 'opacity-50'}`}>
        <div>
          <Typography variant='h4' className={styles.giftItem__title}>
            {isDesktop ? name : name.slice(0, 25) + (name.length > 25 ? '...' : '')}
          </Typography>
          <Typography variant='desc' className={styles.giftItem__weightMob}>
            {weight && `${weight} г`}
          </Typography>
        </div>
        <div className='flex items-end justify-between'>
          <div>
            <Typography variant='p' className={styles.giftItem__weight}>
              {weight && `${weight} г`}
            </Typography>
            {!disabled && (
              <Typography variant='p' className={styles.giftItem__price}>
                бесплатно
              </Typography>
            )}
          </div>
          {!disabled && (
            <PlusButton
              onClick={checked ? removeHandler : addHandler}
              checked={checked}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartGiftItem;
