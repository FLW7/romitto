'use client';

import { useEffect, useState } from 'react';

import { DetailMeal } from '@/feature/detail-meal';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Drawer, DrawerContent } from '@/shared/components/drawer';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/state/modal';

const DetailMealModal = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'detailMeal';
  const [vh, setVh] = useState(600);

  useEffect(() => {
    setVh(window.innerHeight * 0.01);
    console.log(1);
  }, [window.innerHeight, isOpen]);

  if (isMobile) {
    return (
      <Drawer
        open={isModalOpen}
        onOpenChange={(open) => {
          isModalOpen && !open && onClose();
        }}
      >
        <DrawerContent
          className={cn('scrollbar-thin overflow-hidden rounded-t-[22px] p-0')}
          style={{ maxHeight: `calc(${vh * 95}px)` }}
        >
          <DetailMeal />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'max-h-[620px] max-w-[1010px] bg-white !p-0'}>
        <DetailMeal />
      </DialogContent>
    </Dialog>
  );
};

export default DetailMealModal;
