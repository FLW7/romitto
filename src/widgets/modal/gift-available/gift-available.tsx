'use client';

import styles from './style.module.css';

import GiftRedIcon from '@/assets/icons/gift-red.svg';
import { Button } from '@/shared/components/button';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';
import { useCart, useCartOpen } from '@/widgets/cart-widget/state';

const GiftAvailiable = () => {
  const { isOpen, type, onClose, onOpen } = useModal();
  const { giftsType } = useCart();
  const cart = useCartOpen();
  const isModalOpen = isOpen && type === 'giftAvaliable';
  const isModalGetGiftOpen = isOpen && type === 'getGift';
  const isModalChooseGiftOpen = isOpen && type === 'chooseGift';
  const isDesktop = useMediaQuery('(min-width:1024px)');

  const closeModalChange = (val?: boolean) => {
    !val && !isModalGetGiftOpen && !isModalChooseGiftOpen && onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    isDesktop && cart.onOpen();
    giftsType === 1 || giftsType === 3 ? onOpen('getGift') : onOpen('chooseGift');
  };

  return (
    <ResponsiveDialog
      open={isModalOpen}
      onClose={closeModalChange}
      className='z-[51]'
      classNameOverlay='z-[50]'
    >
      <div className='max-md:mt-4 max-md:px-[16px] md:px-[43px] md:py-[51px]'>
        <div className={styles.header}>
          <GiftRedIcon width={36} height={36} className='' />
          <Typography variant='p' className='text-2xl font-semibold'>
            Вам доступен подарок
          </Typography>
        </div>
        <div className='flex gap-[12px] max-md:flex-col'>
          <Button variant={'default'} className='w-full' onClick={handleConfirm}>
            Выбрать
          </Button>
          <Button variant={'outline'} className='w-full' onClick={handleCancel}>
            Отменить
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default GiftAvailiable;
