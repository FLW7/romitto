import React from 'react';

import { useCart } from '../../state';

import CartAdditionalItem from '@/feature/cart-additional-item/cart-additional-item';

const CartCutlery: React.FC = () => {
  const { cutlery, changeCutleryCount } = useCart();

  const countHandler = (id: number, value: number) => {
    changeCutleryCount(id, value);
  };

  return (
    <div className='rounded-xl bg-bgMain px-4 py-[18px] shadow-cartBlockShadow'>
      <div className={'relative'}>
        <ul className='flex flex-col gap-[12px]'>
          {cutlery.map((item, key) => (
            <CartAdditionalItem key={key} item={item} onChange={countHandler} />
          ))}
        </ul>
      </div>
      {/* <div className='mt-[8px] flex flex-col'>
        <Typography variant='desc' className='mt-[2px] text-sm text-secondary'>
          Стоимость прибора - {priceFormatter(priceForCutlery)}
        </Typography>
        <Typography
          variant='desc'
          className={`mt-[2px] text-sm ${cutleriesPrice > 0 ? 'text-parimary' : 'text-secondary'} `}
        >
          Текущая стоимость - {priceFormatter(cutleriesPrice)}
        </Typography>
      </div> */}
    </div>
  );
};

export default CartCutlery;
