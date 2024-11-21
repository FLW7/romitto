'use client';

import { type RefObject, type Dispatch, type SetStateAction } from 'react';

import styles from './style.module.css';

import CartSum from '@/feature/cart-sum/cart-sum';
import { SheetFooter } from '@/shared/components/sheet';

const CartFooter: React.FC<{
  setAdditivesError: Dispatch<SetStateAction<boolean | undefined>>;
  additivesRef: RefObject<HTMLElement>;
  deliveryMinPrice?: string;
  localOrderSale?: string;
}> = ({ setAdditivesError, additivesRef, deliveryMinPrice, localOrderSale }) => {
  return (
    <SheetFooter className={styles.sheetFooter}>
      <div className='mt-[6px] w-[100%] rounded-t-xl bg-bgMain px-[18px] pb-[35px] pt-[10px] shadow-cartBlockShadow'>
        <CartSum
          setAdditivesError={setAdditivesError}
          additivesRef={additivesRef}
          deliveryMinPrice={deliveryMinPrice}
          localOrderSale={localOrderSale}
        />
      </div>
    </SheetFooter>
  );
};

export default CartFooter;
