'use client';

import { FormRateOrder } from '@/feature/form-rate-order';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/drawer';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const RateOrder = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === 'rateOrder';

  const title = data?.title ?? 'Оцените заказ';

  if (isMobile) {
    return (
      <Drawer open={isModalOpen} onClose={onClose}>
        <DrawerContent className={'scrollbar-thin h-fit overflow-y-auto px-4'}>
          <DrawerHeader>
            <DrawerTitle className={'text-center'}>{title}</DrawerTitle>
          </DrawerHeader>

          <FormRateOrder />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'mx-auto max-w-md bg-white p-0 text-black'}>
        <DialogHeader>
          <DialogTitle className={'text-center'}>{title}</DialogTitle>
        </DialogHeader>

        <FormRateOrder />
      </DialogContent>
    </Dialog>
  );
};

export default RateOrder;
