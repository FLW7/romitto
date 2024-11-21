'use client';

import { useRef } from 'react';

import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const PayFrame = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === 'payFrame';
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (isMobile) {
    return (
      <Sheet open={isModalOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='z-[100] min-w-full p-0'>
          {data?.payLink && (
            <iframe
              ref={iframeRef}
              src={data.payLink}
              loading='lazy'
              className='h-screen w-full rounded-xl bg-white p-3'
            ></iframe>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        customCloseButton={false}
        classNameOverlay='z-[50]'
        className={`z-[51] min-h-[200px] w-[500px] max-w-[500px] bg-white md:p-0`}
      >
        {data?.payLink && (
          <iframe
            ref={iframeRef}
            src={data.payLink}
            loading='lazy'
            className='h-[70vh] w-[500px] rounded-xl bg-white p-3'
          ></iframe>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PayFrame;
