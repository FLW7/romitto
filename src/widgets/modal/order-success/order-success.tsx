'use client';

import { useRouter } from 'next/navigation';

import ConfirmOrderIcon from '@/assets/icons/order-confirm.svg';
import { Button } from '@/shared/components/button';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const OrderSuccessContent = () => {
  const router = useRouter();
  const { onClose, data, onOpen } = useModal();

  return (
    <div className='flex h-full flex-col items-center max-md:justify-center'>
      <ConfirmOrderIcon width={300} height={155} />
      <Typography variant='h1' className='mb-4 mt-6 text-center max-md:text-xl'>
        Заказ #{data.orderID} принят в работу
      </Typography>
      <Typography variant='p' className='text-center text-base text-secondary'>
        Заказ принят в работу. Отслеживайте статус заказа в личном кабинете
      </Typography>
      <div className='mt-8 flex w-full gap-3 max-md:flex max-md:flex-col'>
        <Button
          className='w-full'
          onClick={() => {
            router.push('/lk');
            onOpen('detailOrder', { id: data.orderID });
          }}
        >
          Отследить заказ
        </Button>
        <Button
          className='w-full'
          variant={'outline'}
          onClick={() => {
            router.push('/');
            onClose();
          }}
        >
          На главную
        </Button>
      </div>
    </div>
  );
};

const OrderSuccess = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'orderSuccess';

  if (isMobile) {
    return (
      <Sheet open={isModalOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='min-w-full px-8'>
          <OrderSuccessContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        className={'z-[51] bg-white px-[43px] py-[38px]'}
        classNameOverlay='z-[50]'
      >
        <OrderSuccessContent />
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccess;
