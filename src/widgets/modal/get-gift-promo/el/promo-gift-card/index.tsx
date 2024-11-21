import Image from 'next/image';

import PlugImage from '@/assets/icons/not-catalog-img.svg';
import Counter from '@/entities/counter/counter';
import PlusButton from '@/shared/components/plus-button';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
import {
  type IPromoGift,
  type IPromoGiftAdd,
  useCart,
} from '@/widgets/cart-widget/state';

const PromoGiftCard: React.FC<{ item: IPromoGift }> = ({ item }) => {
  const { addPromoGift, AddedPromoGifts, PromoGiftsAvailiable, PromoUsesLeft } =
    useCart();
  const addHandler = (count: number) => {
    const newItem: IPromoGiftAdd = {
      ...item,
      count,
    };

    addPromoGift(newItem);
  };

  const alreadyAdded = AddedPromoGifts?.find((el) => Number(el.id) === Number(item.id));

  const alreadyAddedCount = AddedPromoGifts?.reduce(
    (acc, cur) => acc + Number(cur.count),
    0,
  );

  const availableCount = Math.min(
    Number(PromoGiftsAvailiable ?? 0),
    Number(PromoUsesLeft ?? 0),
  );

  return (
    <div
      className={cn(
        'flex w-[165px] cursor-pointer flex-col overflow-hidden rounded-xl shadow-promoGiftShadow max-md:w-full',
        alreadyAdded && 'border border-main',
      )}
      onClick={() => {
        !alreadyAdded && availableCount - alreadyAddedCount > 0 && addHandler(1);
      }}
    >
      {item?.picture ? (
        <Image
          src={item?.picture}
          width={165}
          height={165}
          alt='rec-img'
          className='w-full object-cover'
        />
      ) : (
        <PlugImage className='aspect-square h-auto w-full object-cover' />
      )}
      <div className='flex h-full flex-col justify-between px-2 pb-3 pt-1'>
        <div>
          <Typography variant='desc' className='!text-base font-semibold'>
            {item?.title}
          </Typography>
        </div>
        <div className='mt-2 flex w-full justify-end'>
          {alreadyAdded ? (
            <Counter
              value={alreadyAdded?.count ?? 0}
              maxValue={availableCount - alreadyAddedCount > 0 ? availableCount : 0}
              callBack={addHandler}
              className='!h-[36px] !w-full'
            />
          ) : (
            <PlusButton
              className={cn(
                'pointer-events-none',
                availableCount - alreadyAddedCount === 0 && 'opacity-50',
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoGiftCard;
