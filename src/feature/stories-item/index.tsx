import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { X } from 'lucide-react';
import Image from 'next/image';

import { ControllersBanners } from '@/feature/stories-item/el/controllers-banners';
import { ControllersStories } from '@/feature/stories-item/el/controllers-stories';
import { ProgressBar } from '@/feature/stories-item/el/progress-bar';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/carousel';
import { useModal } from '@/shared/state/modal';
import type { IGetAllStoriesResponse } from '@/shared/type/product';
interface Props {
  setBgImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export function StoriesItem({ setBgImage }: Props) {
  const { data: modalData, onClose } = useModal();
  const [selectBannerIndex, setSelectBannerIndex] = useState<number>(modalData?.index);
  const [activeIndex, setActiveIndex] = useState(0);
  const data = modalData?.data as IGetAllStoriesResponse;
  const [api, setApi] = useState<any>();

  const activeBanner = data?.stories?.[selectBannerIndex];
  const activeStories = data?.stories?.[selectBannerIndex]?.stories;
  const lengthBanners = data?.stories?.length ?? 0;

  const handleFinish = useCallback(
    (index: number) => {
      if (
        lengthBanners - 1 === selectBannerIndex &&
        index === (activeStories?.length ?? 0) - 1
      ) {
        onClose();

        return;
      }

      if (index === (activeStories?.length ?? 0) - 1) {
        setSelectBannerIndex((prev) => prev + 1);
        setActiveIndex(0);
      } else {
        setActiveIndex(index + 1);
      }
    },
    [activeStories?.length, selectBannerIndex],
  );

  useEffect(() => {
    api?.scrollTo(selectBannerIndex);
  }, [selectBannerIndex]);

  useEffect(() => {
    if (modalData?.index !== selectBannerIndex) {
      setSelectBannerIndex(modalData?.index);
    }
  }, [modalData?.index]);

  useEffect(() => {
    setBgImage(data?.stories?.[selectBannerIndex]?.pictureThumbnail);
  }, [selectBannerIndex]);

  if (!activeBanner) return null;

  return (
    <div className={'relative sm:w-[540px]'}>
      <div
        className={
          'absolute top-1 z-20 grid w-full gap-2 px-2 max-md:top-[10px] max-md:w-[calc(100%-40px)]'
        }
        style={{ gridTemplateColumns: `repeat(${activeStories?.length}, 1fr)` }}
      >
        {activeStories?.map((el, index) => (
          <ProgressBar
            index={index}
            key={el.id}
            progress={0}
            duration={4}
            activeIndex={activeIndex}
            onFinish={() => {
              handleFinish(index);
            }}
          />
        ))}
      </div>
      <div
        onClick={onClose}
        className='data-[state=open]:text-muted-foreground absolute right-2 top-0 !z-30 inline-flex h-7 w-7 translate-y-[20%] items-center justify-center rounded-full bg-black/20 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none sm:-right-[42px] sm:-top-10 sm:bg-none2'
      >
        <X size={24} color='white' strokeWidth={2} />
      </div>
      <ControllersStories
        setActiveIndex={setActiveIndex}
        max={(activeStories?.length ?? 0) - 1}
      />
      <Carousel className={''} setApi={setApi}>
        <CarouselContent className='!m-0  flex items-center'>
          {data?.stories?.map((_, index) => (
            <CarouselItem key={index} className='grid basis-full !p-0'>
              <div className={'relative rounded-[12px]'}>
                {activeStories?.[activeIndex]?.picture && (
                  <Image
                    loading={'eager'}
                    quality={40}
                    priority={true}
                    src={activeStories?.[activeIndex]?.picture}
                    width={540}
                    height={900}
                    className='h-[100vh] bg-black/5  object-contain sm:h-[80vh] sm:w-[540px] sm:rounded-md'
                    alt='image'
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <ControllersBanners
          lengthBanners={lengthBanners}
          selectBannerIndex={selectBannerIndex}
          setSelectBannerIndex={setSelectBannerIndex}
          setActiveIndex={setActiveIndex}
        />
      </Carousel>
    </div>
  );
}
