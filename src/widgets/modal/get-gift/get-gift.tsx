'use client';

import styles from './style.module.css';

import GiftCard from '@/entities/gift-card/gift-card';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/carousel';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';
import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';

const GetGift = () => {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'getGift';
  const isModalChooseOpen = isOpen && type === 'chooseGift';

  const closeModal = () => {
    !isModalChooseOpen && onClose();
  };

  const { availableGifts, orderSum, gifts, giftsType } = useCart();

  return (
    <ResponsiveDialog
      open={isModalOpen}
      onClose={closeModal}
      className='bg-bgMain'
      classNameOverlay='z-[50]'
    >
      <div className='pb-[52px] max-md:mt-4 max-md:px-4 md:px-[46px] md:pt-[30px]'>
        <div className='text-center'>
          <Typography variant='h3' className={styles.title}>
            Получите подарок!
          </Typography>
          <Typography variant='p' className='text-base text-secondary max-md:text-sm'>
            Выбирайте то, что нравится именно Вам - а мы подарим.
          </Typography>
        </div>
        <div className={styles.itemsList}>
          <Carousel className='w-full' opts={{ dragFree: true }}>
            <CarouselContent className='ml-1 mr-2'>
              {availableGifts.map((item, key) => {
                return (
                  <CarouselItem key={key} className={styles.item}>
                    <GiftCard
                      price={item.minPrice}
                      disabled={
                        orderSum < item.minPrice ||
                        (gifts.length > 0 && giftsType === 3 && gifts[0].id !== item.id)
                      }
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default GetGift;
