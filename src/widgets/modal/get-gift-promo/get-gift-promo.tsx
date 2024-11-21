/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/consistent-function-scoping */
'use client';

import PromoGiftCard from './el/promo-gift-card';
import styles from './style.module.css';

import { Button } from '@/shared/components/button';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';
import { ScrollArea } from '@/shared/components/scroll-area';
import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';

const GetGiftPromo = () => {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'getGiftPromo';

  const { PromoGifts, PromoGiftsAvailiable, AddedPromoGifts, PromoUsesLeft } = useCart();
  const alreadyAdded = AddedPromoGifts?.reduce((acc, cur) => acc + Number(cur.count), 0);
  const availableCount = Math.min(
    Number(PromoGiftsAvailiable ?? 0),
    Number(PromoUsesLeft ?? 0),
  );

  return (
    <ResponsiveDialog
      open={isModalOpen}
      onClose={onClose}
      className={`z-[51] max-h-[80vh] md:h-[757px] md:min-w-[1010px]`}
      classNameOverlay='z-[50]'
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className='flex flex-col items-center'>
            <Typography variant='h3' className='text-center text-2xl font-semibold'>
              Вам доступно {availableCount} подарка!
            </Typography>
            <Typography variant='p' className='text-center text-base max-md:text-sm'>
              Нажмите на подарки, которые хотите выбрать. Осталось{' '}
              {availableCount - alreadyAdded}.
            </Typography>
          </div>
        </div>
        <ScrollArea className='mt-8 h-[55vh] max-h-[550px] max-w-[877px] max-md:h-[60vh] max-sm:pb-4'>
          <div className={styles.itemsList}>
            {PromoGifts?.map((item, key) => {
              return <PromoGiftCard key={key} item={item} />;
            })}
          </div>
        </ScrollArea>
      </div>
      <div className='bottom-0 flex w-full justify-center max-sm:fixed'>
        <div className='flex w-full justify-center max-md:mb-4 md:mb-[10px]'>
          <Button className={styles.closeBtn} onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};

export default GetGiftPromo;
