'use client';

import { FormChooseCity } from '@/feature/form-choose-city';
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

export const ChoosingCity = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'choosingCity';

  if (isMobile) {
    return (
      <Drawer open={isModalOpen} onClose={onClose}>
        <DrawerContent className={'px-4'}>
          <DrawerHeader className={'mb-4'}>
            <DrawerTitle className={'text-center'}>Ваш город</DrawerTitle>
          </DrawerHeader>

          <FormChooseCity />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'mx-auto max-w-md bg-white p-0 text-black'}>
        <DialogHeader className={'mb-7'}>
          <DialogTitle className={'text-center'}>Ваш город</DialogTitle>
        </DialogHeader>

        <FormChooseCity />
      </DialogContent>
    </Dialog>
  );
};
