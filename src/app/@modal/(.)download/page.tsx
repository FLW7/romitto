'use client';

import { useRouter } from 'next/navigation';

import AdAppContent from '@/feature/ad-app-content';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Drawer, DrawerContent } from '@/shared/components/drawer';
import { ScrollArea } from '@/shared/components/scroll-area';
import useMediaQuery from '@/shared/hooks/use-media-query';

const Download = () => {
  const isMobile = useMediaQuery('(max-width: 922px)');
  const router = useRouter();

  return isMobile ? (
    <Drawer
      open={true}
      onClose={() => {
        router.back();
      }}
    >
      <DrawerContent className={'z-[51] !p-0'}>
        <ScrollArea className='max-h-[87vh]'>
          <AdAppContent />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent
        className={'z-[52] !min-w-[922px] bg-white !p-0 text-black'}
        classNameOverlay='z-[51]'
      >
        <AdAppContent />
      </DialogContent>
    </Dialog>
  );
};

export default Download;
