'use client';

import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';
import { DetailOrder } from '@/widgets/lk/detail-order';

const DetailOrderModal = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === 'detailOrder';

  if (isMobile) {
    return (
      <Sheet open={isModalOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className={'!p-0'}>
          <DetailOrder id={data?.id} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'mx-auto bg-white !p-0 text-black'}>
        <DetailOrder id={data?.id} />
      </DialogContent>
    </Dialog>
  );
};

export default DetailOrderModal;
