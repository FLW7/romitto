'use client';

import { useEffect, useState } from 'react';

import BurgerIcon from '@/assets/icons/header/burger.svg';
import SidebarCatalog from '@/feature/sidebar-catalog';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/components/popover';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

export const Burger = () => {
  const { onOpen, isOpen } = useModal();
  const isMobile = useMediaQuery('(max-width:769px)');
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      document.body.classList.add('no-scroll--normal');
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll--normal');
    };
  }, []);
  useEffect(() => {
    popoverIsOpen && document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [popoverIsOpen]);

  return isMobile ? (
    <button
      className={'pl-4'}
      onClick={() => {
        onOpen('catalog');
      }}
    >
      <BurgerIcon className={'h-6 w-6'} />
    </button>
  ) : (
    <Popover onOpenChange={setPopoverIsOpen}>
      <PopoverTrigger className='pl-4'>
        <BurgerIcon className={'h-6 w-6'} />
      </PopoverTrigger>
      {popoverIsOpen && (
        <div className='fixed left-0 top-0 z-[70] h-screen w-[100vw] bg-black/50'></div>
      )}
      <PopoverContent
        align='end'
        side='bottom'
        className='z-[100] min-w-[300px] overflow-hidden rounded-[22px] bg-white pb-[28px]'
      >
        <SidebarCatalog />
      </PopoverContent>
    </Popover>
  );
};
