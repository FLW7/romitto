'use client';

import { useRouter } from 'next/navigation';

import RejectOrderIcon from '@/assets/icons/order-reject.svg';
import { Button } from '@/shared/components/button';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const OrderRejectContent = () => {
  const router = useRouter();
  const { onClose, data } = useModal();

  return (
    <div className='flex h-full flex-col items-center max-md:justify-center'>
      <RejectOrderIcon width={300} height={155} />
      <Typography variant='h1' className='mb-4 mt-6 text-center max-md:text-xl'>
        {data.title}
      </Typography>
      <Typography variant='p' className='text-center text-base text-secondary'>
        {data.message}
      </Typography>
      <div className='mt-8 flex w-full gap-3 max-md:flex max-md:flex-col'>
        {/* <Button className='w-full'>Оплатить</Button> */}
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

const OrderReject = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'orderReject';

  if (isMobile) {
    return (
      <Sheet open={isModalOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='min-w-full px-8'>
          <OrderRejectContent />
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
        <OrderRejectContent />
      </DialogContent>
    </Dialog>
  );
};

export default OrderReject;
