'use client';

import { FormPlacingOrder } from '@/feature/form-placing-order/form-placing-ordr';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { ScrollArea } from '@/shared/components/scroll-area';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const PlacingOrder = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'placingOrder';

  if (isMobile) {
    return (
      <Sheet open={isModalOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='z-[100] min-w-full bg-bgDark p-0'>
          <FormPlacingOrder />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        customCloseButton={false}
        classNameOverlay='z-[51]'
        className={`z-[52] mx-auto max-h-[650px] w-[1080px] max-w-full overflow-hidden bg-bgDark px-[70px] pb-[50px] pt-[50px] text-black max-[1200px]:w-[768px] min-[1200px]:pl-[70px] min-[1200px]:pr-[38px]`}
      >
        <ScrollArea className='h-[500px]'>
          <FormPlacingOrder />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PlacingOrder;
