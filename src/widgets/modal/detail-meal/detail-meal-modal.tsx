'use client';

import { DetailMeal } from '@/feature/detail-meal';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Drawer, DrawerContent } from '@/shared/components/drawer';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const DetailMealModal = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'detailMeal';

  if (isMobile) {
    return (
      <Drawer
        open={isModalOpen}
        onOpenChange={(open) => {
          isModalOpen && !open && onClose();
        }}
      >
        <DrawerContent
          className={
            'scrollbar-thin max-h-[85vh] overflow-hidden rounded-t-3xl !bg-cartBg p-0'
          }
        >
          <DetailMeal />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'max-h-[620px] max-w-[1010px] bg-cartBg !p-0'}>
        <DetailMeal />
      </DialogContent>
    </Dialog>
  );
};

export default DetailMealModal;
