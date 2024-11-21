/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable unicorn/no-nested-ternary */

import { ChevronRight } from 'lucide-react';

import TitleIcon from '@/assets/icons/cart-gift-promo.svg';
import { Button } from '@/shared/components/button';
import { Progress } from '@/shared/components/progress';
import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';

const CartGiftPromo = () => {
  const { onOpen } = useModal();
  const { PromoGiftsAvailiable, AddedPromoGifts, PromoUsesLeft } = useCart();
  const alreadyAdded = AddedPromoGifts?.reduce((acc, cur) => acc + Number(cur.count), 0);
  const availableCount = Math.min(
    Number(PromoGiftsAvailiable ?? 0),
    Number(PromoUsesLeft ?? 0),
  );

  return (
    <div className='relative mr-4'>
      <div className='flex items-center gap-2'>
        <TitleIcon className='h-6 w-[46px]' />
        <Typography variant='desc' className='!text-base font-semibold'>
          Подарки по промокоду
        </Typography>
      </div>
      <div
        className='relative mt-3 cursor-pointer'
        onClick={() => {
          onOpen('getGiftPromo');
        }}
      >
        <div className='flex w-full items-center justify-between px-5 py-[10px]'>
          <div>
            <Typography variant='desc' className='!text-base font-medium !text-white'>
              {availableCount === alreadyAdded
                ? `Вы добавили ${alreadyAdded} подарков!`
                : `${availableCount} подарка. Можно выбрать еще!`}
            </Typography>
            <Typography variant='desc' className='!text-sm font-normal !text-white'>
              {availableCount === alreadyAdded
                ? 'Вы можете их заменить'
                : `Доступно еще ${availableCount - alreadyAdded}`}
            </Typography>
          </div>
          <Button className='bg-white py-2 pl-[10px] pr-2 !text-xs font-semibold text-primary'>
            выбрать
            <ChevronRight size={12} className='ml-1' />
          </Button>
        </div>
        <Progress
          value={(alreadyAdded / availableCount) * 100}
          className='absolute  top-0 z-[-1] h-full w-full rounded-xl bg-main'
          classNameIndicator='bg-white/10 rounded-xl'
        />
      </div>
    </div>
  );
};

export default CartGiftPromo;
