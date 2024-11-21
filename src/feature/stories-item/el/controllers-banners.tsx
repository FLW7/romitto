import * as React from 'react';

import ArrowLeft from '@/assets/icons/arrow-left-short.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import { cn } from '@/shared/lib/utils';
interface Props {
  selectBannerIndex: number;
  lengthBanners: number;
  setSelectBannerIndex: React.Dispatch<React.SetStateAction<number>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
export const ControllersBanners = ({
  selectBannerIndex,
  setSelectBannerIndex,
  setActiveIndex,
  lengthBanners,
}: Props) => {
  return (
    <>
      <button
        disabled={selectBannerIndex <= 0}
        className={cn(
          selectBannerIndex <= 0 && 'hidden',
          'center absolute left-6 top-1/2 z-30 h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-black/40 outline-none sm:-left-20 sm:bg-none2',
        )}
        onClick={() => {
          setSelectBannerIndex((prev) => prev - 1);
          setActiveIndex(0);
        }}
      >
        <ArrowLeft className='h-4 w-4 stroke-white sm:h-8 sm:w-8 sm:stroke-lightGrey2' />
      </button>

      <button
        disabled={selectBannerIndex >= lengthBanners - 1}
        className={cn(
          selectBannerIndex >= lengthBanners - 1 && 'hidden',
          'center absolute right-6 top-1/2 z-30 h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-black/40 outline-none sm:-right-20 sm:bg-none2',
        )}
        onClick={() => {
          setSelectBannerIndex((prev) => prev + 1);
          setActiveIndex(0);
        }}
      >
        <ArrowRight className='h-4 w-4 stroke-white sm:h-8 sm:w-8 sm:stroke-lightGrey2' />
      </button>
    </>
  );
};
