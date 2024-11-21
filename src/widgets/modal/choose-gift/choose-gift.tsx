/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/consistent-function-scoping */
'use client';

import { type Dispatch, type SetStateAction } from 'react';

import styles from './style.module.css';

import BackArrow from '@/assets/icons/arrow-left.svg';
import CartGift from '@/entities/cart-gift/cart-gift';
import BasketGiftItem from '@/feature/cart-gift-item/cart-gift-item';
import { Button } from '@/shared/components/button';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';
import { ScrollArea } from '@/shared/components/scroll-area';
import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';
import { type TCartGiftItem } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

export interface ChooseGiftProps {
  giftStep: number;
  setGiftStep: Dispatch<SetStateAction<number>>;
}

const ChooseGift: React.FC<ChooseGiftProps> = ({ giftStep, setGiftStep }) => {
  const { isOpen, type, onClose, onOpen } = useModal();
  const isModalOpen = isOpen && type === 'chooseGift';

  const isModalGetOpen = isOpen && type === 'getGift';
  const closeModalChange = () => {
    !isModalGetOpen && onClose();
  };

  const { availableGifts, gifts, orderSum, giftsType, giftLevelPriceArr } = useCart();

  const giftsWithSteps = giftsType === 2 || giftsType === 4;

  const nextStepHandler = () => {
    setGiftStep((prev) => prev + 1);
  };
  const prevStepHandler = () => {
    setGiftStep((prev) => prev - 1);
  };

  const closeHandler = () => {
    setGiftStep(1);
    onClose();
  };

  const handleBack = () => {
    giftsWithSteps && giftStep > 1 ? prevStepHandler() : closeHandler();
    !giftsWithSteps && onOpen('getGift');
  };

  const giftLevelsArr = [...new Set(giftLevelPriceArr)];

  const currentItems = giftsWithSteps
    ? availableGifts.filter(
        (item: TCartGiftItem) => item.minPrice === giftLevelsArr[giftStep - 1],
      )
    : availableGifts;

  return (
    <ResponsiveDialog
      open={isModalOpen}
      onClose={closeModalChange}
      className={`z-[51] bg-bgDark ${giftsWithSteps && giftStep < giftLevelsArr.length ? 'max-h-[90vh] max-md:h-[90vh]' : 'max-h-[80vh] max-md:h-[80vh]'} max-md:mb-[30px] `}
      classNameOverlay='z-[50]'
    >
      <div className={styles.container}>
        <div className='mx-auto mb-4 w-[80%]'>
          <CartGift setGiftStep={setGiftStep} min={true} />
        </div>
        <div className={styles.header}>
          {giftStep > 1 ? (
            <BackArrow onClick={handleBack} className='h-8 w-8 cursor-pointer' />
          ) : (
            <span className='w-8' />
          )}
          <div className='-ml-8 flex flex-col items-center'>
            <Typography variant='h3' className='text-2xl font-semibold'>
              Выберите подарок
            </Typography>
            {/* <Typography variant='p' className='text-base text-secondary max-md:text-sm'>
              Выберите один из {currentItems.length}
            </Typography> */}
          </div>
          <span />
        </div>
        <ScrollArea className='mt-8 h-[30vh] max-md:h-[45vh]'>
          <div className={styles.itemsList}>
            {currentItems.map((item, key) => {
              return (
                <BasketGiftItem
                  key={key}
                  id={item.id}
                  weight={item.weight}
                  name={item.name}
                  picture={item.picture}
                  delivery_type={item.delivery_type}
                  minPrice={item.minPrice}
                  checked={gifts.some((gift) => gift.id === item.id)}
                  disabled={
                    orderSum < item.minPrice ||
                    (gifts.length > 0 && giftsType === 3 && gifts[0].id !== item.id)
                  }
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className='flex justify-center'>
        {giftsWithSteps && giftStep < giftLevelsArr.length ? (
          <div className='flex w-full justify-between gap-4 max-md:mb-28 max-md:mt-[30px] max-md:flex-col max-md:px-4 md:mb-14 md:px-[83px]'>
            <Button onClick={nextStepHandler} className='w-full'>
              Продолжить
            </Button>
            <Button variant={'outline'} onClick={closeHandler} className='w-full'>
              Закрыть
            </Button>
          </div>
        ) : (
          <div className='flex w-full justify-center max-md:mb-28 md:mb-14'>
            <Button className={styles.closeBtn} onClick={closeHandler}>
              Закрыть
            </Button>
          </div>
        )}
      </div>
    </ResponsiveDialog>
  );
};

export default ChooseGift;
