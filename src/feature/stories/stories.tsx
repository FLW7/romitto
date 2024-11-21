import { useEffect, useState } from 'react';

import Image from 'next/image';

import { CardContent } from '@/shared/components/card';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/carousel';
import { useGetAllStories } from '@/shared/hooks/query/use-get-all-stories';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const Stories = () => {
  const [align, setAlign] = useState<'start' | 'center'>('start');
  const isMobile = useMediaQuery('(max-width: 735px)');

  useEffect(() => {
    setAlign(isMobile ? 'center' : 'start');
  }, [isMobile]);

  const { onOpen } = useModal();
  const { data } = useGetAllStories();
  const handleOpenModal = (index: number) => {
    onOpen('stories', {
      index,
      data,
    });
  };

  return (
    (data?.stories?.length ?? 0) > 0 && (
      <section className='mt-5 flex max-w-full flex-col px-3 lg:mt-[50px]'>
        <Carousel
          opts={{
            align,
            dragFree: true,
          }}
          className='grow'
        >
          {/* <div className='pointer-events-none absolute left-0 top-0 z-[1] h-full w-1/6 bg-gradient-to-r from-white'></div> */}
          <CarouselContent className='ml-1'>
            {data?.stories?.map((el, index) => (
              <CarouselItem key={index} className='basis-1/9 cursor-pointer pl-0 pr-2'>
                <CardContent className='flex aspect-square h-fit items-center justify-center p-0'>
                  <button
                    className='rounded-[9px] bg-main p-[2px]'
                    onClick={() => {
                      handleOpenModal(index);
                    }}
                  >
                    <Image
                      src={el.pictureThumbnail}
                      className='block h-[248px] w-[178px] rounded-[8px] border-2 bg-white object-cover p-[1px] max-sm:h-[130px] max-sm:w-[100px]'
                      width={500}
                      height={500}
                      alt='Picture of the author'
                    />
                  </button>
                </CardContent>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <div className='pointer-events-none absolute right-0 top-0 z-[1] h-full w-1/6 bg-gradient-to-l from-white'></div> */}
          {/* <CarouselPrevious className='left-2 z-[2]' /> */}
          {/* <CarouselNext className='right-2 z-[2]' /> */}
        </Carousel>
      </section>
    )
  );
};

export default Stories;
