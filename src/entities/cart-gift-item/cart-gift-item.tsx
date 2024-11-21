'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import styles from './styles.module.css';

import RedGiftIcon from '@/assets/icons/gift-red.svg';
import PromoGiftImg from '@/assets/icons/promo-gift.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { useCart } from '@/widgets/cart-widget/state';

const CartGiftItem: React.FC<{
  id?: number;
  name: string;
  picture?: string;
  weight?: number;
  giftDefaultPicture?: boolean;
  deleteBtn?: boolean;
}> = ({ id, name, picture, weight, deleteBtn = true }) => {
  const { deleteGift, removePromocode } = useCart();

  const deleteHandler = () => {
    id ? deleteGift(id) : removePromocode();
  };

  return (
    <li className={styles.basketItem}>
      {picture ? (
        <Image
          src={picture}
          width={100}
          height={100}
          alt='order-image'
          className={styles.basketItem__image}
        />
      ) : (
        <PromoGiftImg className={styles.basketItem__image} />
      )}
      <div className={styles.basketItem__content}>
        <div className='flex justify-between gap-[18px]'>
          <Typography
            variant='desc'
            className={`line-clamp-2 text-sm font-normal text-primary`}
          >
            {name}
          </Typography>
          {deleteBtn && (
            <Button className='h-fit p-0' variant={'ghost'} onClick={deleteHandler}>
              <X color='#C0C0C0' size={20} className='transition hover:brightness-75' />
            </Button>
          )}
        </div>
        <div className={styles.basketItem__actions}>
          <Typography
            variant='p'
            className='mb-0 h-fit text-base font-medium text-secondary max-md:text-xs max-md:font-semibold'
          >
            {weight && `${weight}`}
          </Typography>
          <RedGiftIcon width={36} height={36} />
        </div>
      </div>
    </li>
  );
};

export default CartGiftItem;
