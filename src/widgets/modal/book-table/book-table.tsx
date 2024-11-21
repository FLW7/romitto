'use client';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { FormBookTable } from '@/feature/form-book-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/drawer';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const BookTable = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose, onOpen } = useModal();

  const isModalOpen = isOpen && type === 'bookTable';

  if (isMobile) {
    return (
      <Drawer
        open={isModalOpen}
        onClose={() => {
          isModalOpen && onClose();
        }}
      >
        <DrawerContent className={'z-[51] px-4 pb-8'}>
          <DrawerHeader className={'mb-4'}>
            <DrawerTitle className={'text-center'}>Забронировать стол</DrawerTitle>
            <DrawerDescription>Укажите необходимые данные</DrawerDescription>
          </DrawerHeader>
          <FormBookTable />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'mx-auto max-w-xl  bg-white  text-black'}>
        <button
          className={'absolute left-10 top-10'}
          onClick={() => {
            onOpen('bookTableDatePicker');
          }}
        >
          <ArrowLeftIcon />
        </button>

        <DialogHeader className={'mb-2'}>
          <DialogTitle className={'text-center'}>Забронировать стол</DialogTitle>
          <DialogDescription>Укажите необходимые данные</DialogDescription>
        </DialogHeader>

        <FormBookTable />
      </DialogContent>
    </Dialog>
  );
};

export default BookTable;
