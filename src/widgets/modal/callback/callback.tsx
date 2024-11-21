'use client';

import { FormCallback } from '@/feature/form-callback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const Callback = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'callback';

  if (isMobile) {
    return (
      <Sheet open={isModalOpen} onOpenChange={onClose}>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle className={'text-center'}>Мы вам перезвоним</SheetTitle>
            <SheetDescription>
              Оставьте контакты, и менеджер свяжется с вами в ближайшее время
            </SheetDescription>
          </SheetHeader>

          <FormCallback />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'mx-auto max-w-md bg-white p-0 text-black'}>
        <DialogHeader>
          <DialogTitle className={'text-center'}>Мы вам перезвоним</DialogTitle>
          <DialogDescription>
            Оставьте контакты, и менеджер свяжется с вами в ближайшее время
          </DialogDescription>
        </DialogHeader>

        <FormCallback />
      </DialogContent>
    </Dialog>
  );
};

export default Callback;
