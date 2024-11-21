'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { scrollToSection } from '../header/lib/scroll-to-section';
import { type ICategory } from '../wrapper-menu/types';

import Logo from '@/assets/icons/logo.svg';
import TabTrigger from '@/entities/tab-trigger/tab-trigger';
import { ScrollArea } from '@/shared/components/scroll-area';
import { Tabs, TabsList } from '@/shared/components/tabs';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';

const CatalogSidebar: React.FC<{
  activeCategory: number;
  categories: ICategory[];
}> = ({ activeCategory, categories }) => {
  const router = useRouter();

  return (
    <Tabs
      value={
        categories?.find((item) => Number(item.id) === Number(activeCategory))?.name ?? ''
      }
      className='sticky left-0 top-4 z-[20] ml-4 flex h-fit max-h-screen w-[303px] overflow-hidden rounded-xl bg-white shadow-productCart'
    >
      <TabsList className='flex flex-col items-start justify-start rounded-none bg-none p-0'>
        <Logo
          onClick={() => {
            router.push('/');
          }}
          width={111}
          height={44}
          className={'my-6 ml-8 max-h-[44px] max-w-[111px] cursor-pointer'}
        />
        <ScrollArea className='h-[calc(100vh-130px)] max-w-full overflow-x-hidden px-2 pb-3'>
          {categories?.map((item: ICategory, key: number) => (
            <TabTrigger
              onClick={() => {
                scrollToSection(String(item.id));
              }}
              className='justify-start rounded-none !py-[11px] px-[24px] text-start text-base !shadow-none hover:bg-cartBg'
              key={key}
              value={item?.name ?? ''}
            >
              <div className='flex w-full items-center justify-between'>
                <Typography
                  variant='desc'
                  className={cn(
                    'h-[22px] !text-start !text-base font-semibold leading-[23px]',
                    Number(activeCategory) === Number(item.id) && '!text-main',
                  )}
                >
                  {item?.name}
                </Typography>
              </div>
            </TabTrigger>
          ))}
        </ScrollArea>
      </TabsList>
    </Tabs>
  );
};

export default CatalogSidebar;
