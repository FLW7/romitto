'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Logo from '@/assets/icons/logo.svg';
import TabTrigger from '@/entities/tab-trigger/tab-trigger';
import { ScrollArea } from '@/shared/components/scroll-area';
import { Tabs, TabsList } from '@/shared/components/tabs';
import { type ICategory } from '@/widgets/wrapper-menu/types';

const CatalogSidebar: React.FC<{
  activeCategory: number;
  scrollToBlock: (currentRef: any) => void;
  categories: ICategory[];
}> = ({ activeCategory, scrollToBlock, categories }) => {
  const router = useRouter();

  return (
    <Tabs
      value={categories?.[activeCategory]?.name ?? ''}
      className='sticky left-0 top-0 z-10 flex h-fit max-h-screen w-[303px] rounded-none bg-white shadow-cardLk'
    >
      <TabsList className='flex flex-col items-start justify-start rounded-none bg-none p-0'>
        <Logo
          onClick={() => {
            router.push('/');
          }}
          width={167}
          height={69}
          className={'mx-auto my-8 max-h-[69px] max-w-[167px] cursor-pointer'}
        />
        <ScrollArea className='h-screen max-w-full overflow-x-hidden'>
          {categories?.map((item: ICategory, key: number) => (
            <TabTrigger
              onClick={() => {
                scrollToBlock(key);
              }}
              className='justify-start rounded-none px-[24px] py-[19px] text-start text-base'
              key={key}
              value={item?.name ?? ''}
            >
              {item?.name}
            </TabTrigger>
          ))}
        </ScrollArea>
      </TabsList>
    </Tabs>
  );
};

export default CatalogSidebar;
