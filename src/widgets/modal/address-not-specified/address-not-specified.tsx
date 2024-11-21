'use client';

import { FormAddressNotSpecified } from '@/feature/form-address-not-specified';
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

const AddressNotSpecified = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === 'addressNotSpecified';

  if (isMobile) {
    return (
      <Drawer
        open={isModalOpen}
        onClose={() => {
          isModalOpen && onClose();
        }}
      >
        <DrawerContent className={'z-[51] bg-bgMain px-4 pb-8'}>
          <DrawerHeader className={'mb-4'}>
            <DrawerTitle className={'text-center text-primary'}>
              Какой у вас адрес?
            </DrawerTitle>
            <DrawerDescription className={'text-center text-secondary'}>
              Адрес сохраним для будущих заказов.
            </DrawerDescription>
          </DrawerHeader>
          <FormAddressNotSpecified addPlate={data?.addPlate} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        className={'z-[52] mx-auto max-w-lg overflow-hidden bg-bgMain p-0 text-black'}
        classNameOverlay='z-[51]'
      >
        <DialogHeader className={'mb-7'}>
          <DialogTitle className={'text-center text-primary'}>
            Какой у вас адрес?
          </DialogTitle>
          <DialogDescription className={'text-secondary'}>
            Адрес сохраним для будущих заказов.
          </DialogDescription>
        </DialogHeader>

        <FormAddressNotSpecified addPlate={data?.addPlate} />
      </DialogContent>
    </Dialog>
  );
};

export default AddressNotSpecified;
