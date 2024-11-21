/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import React, { forwardRef, type Dispatch, type SetStateAction } from 'react';

import { useCart } from '../../state';

import CartAdditionalItem from '@/feature/cart-additional-item/cart-additional-item';

interface IAdditivesProps {
  additivesError?: boolean;
  setAdditivesError?: Dispatch<SetStateAction<boolean | undefined>>;
}

const CartAdditives = forwardRef<HTMLDivElement, IAdditivesProps>(
  ({ additivesError, setAdditivesError }, ref) => {
    const { additives, changeAdditivesCount } = useCart();

    const additivesCount = additives.reduce(
      (curr: any, acc: any) => curr + (acc.countInCart ?? 0),
      0,
    );
    const countHandler = (id: number, value: number) => {
      additivesCount < value && setAdditivesError?.(false);
      changeAdditivesCount(id, value);
    };

    return (
      <>
        {/* <TooltipCustom
          id='additives-tooltip'
          isOpen={additivesError}
          offset={20}
          events={['hover']}
        /> */}
        <div
          ref={ref}
          data-tooltip-id='additives-tooltip'
          data-tooltip-content='Не забудьте добавить в заказ'
          className={`rounded-xl bg-bgMain px-4 py-[18px] shadow-cartBlockShadow ${additivesError ? 'border-main' : 'border-grey'}`}
        >
          <ul className='flex flex-col gap-[12px]'>
            {additives.map((item, key) => (
              <CartAdditionalItem key={key} item={item} onChange={countHandler} />
            ))}
          </ul>
        </div>
        {/* {Number(priceForAddition) !== 0 && (
          <div className='mt-[8px] flex flex-col px-[24px]'>
            <Typography variant='desc' className='text-sm text-secondary'>
              Бесплатно можно добавить - {freeAdditives} шт.
            </Typography>
            <Typography variant='desc' className='mt-[2px] text-sm text-secondary'>
              Стоимость дополнения - {priceFormatter(priceForAddition)}
            </Typography>
            <Typography
              variant='desc'
              className={`mt-[2px] text-sm ${additivesPrice > 0 ? 'text-parimary' : 'text-secondary'} `}
            >
              Текущая стоимость - {priceFormatter(additivesPrice)}
            </Typography>
          </div>
        )} */}
      </>
    );
  },
);

export default CartAdditives;
