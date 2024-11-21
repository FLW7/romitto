'use client';

import * as React from 'react';
import { useState } from 'react';

import Image from 'next/image';

import { StoriesItem } from '@/feature/stories-item';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { useModal } from '@/shared/state/modal';

const Stories = () => {
  const [bgImage, setBgImage] = useState<string | undefined>();
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'stories';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      {isModalOpen && (
        <div className='absolute left-0 top-0 z-20 h-[100%] w-[100vw] backdrop-blur-xl'>
          {bgImage && (
            <Image
              src={bgImage}
              alt='image'
              fill
              style={{ filter: 'blur(70px)' }}
              className={'inset-0 block backdrop-blur-lg max-sm:backdrop-blur-55'}
            />
          )}
        </div>
      )}

      <DialogContent
        className={
          'flex h-full items-center justify-center !p-0 !shadow-none sm:h-auto sm:w-[540px]'
        }
        onClose={onClose}
        classNameOverlay={'bg-black/20'}
        hideCloseButton
      >
        <StoriesItem setBgImage={setBgImage} />
      </DialogContent>
    </Dialog>
  );
};

export default Stories;
