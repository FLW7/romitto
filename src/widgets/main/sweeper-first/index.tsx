'use client';

import { useEffect, useRef, useState } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

import CarouselDots from '@/entities/carousel-dots/carousel-dots';
import { CardContent } from '@/shared/components/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/carousel';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';

const ARR = [1, 2, 3, 4, 5];

export const SweeperFirst = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { data, isPending, isLoading, isError } = useGetCatalog();
  const load = isPending || isLoading;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const banners = data?.bannersAll?.filter((el) => el.type === '0');

  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    (banners?.length ?? 0) > 0 && (
      <section className='group relative mt-7 flex flex-col md:px-3 lg:mt-10'>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          defaultValue={2}
          plugins={[
            Autoplay({
              delay: 10_000,
            }),
          ]}
          className='grow !overflow-visible'
        >
          <CarouselContent className={'!overflow-visible max-sm:!ml-4'}>
            {(load || isError) &&
              ARR.map((el) => (
                <CarouselItem key={el} className={'grid grid-cols-1 sm:pl-5'}>
                  <CardContent className='group relative mx-auto h-[330px] basis-1/2 overflow-hidden rounded-[22px] max-lg:h-[180px]'>
                    <div className='h-full w-full animate-pulse rounded-[22px] bg-black/5' />
                  </CardContent>
                </CarouselItem>
              ))}

            {banners
              ?.filter((el) => el.type === '0')
              .map((el, index) => (
                <CarouselItem
                  key={index}
                  className={
                    'grid basis-full grid-cols-1 pl-0 max-sm:pr-4 sm:basis-1/2 sm:pl-5'
                  }
                >
                  <CardContent className='group relative mx-auto aspect-[630/330] basis-full overflow-hidden rounded-[20px] max-sm:rounded-[16px] sm:basis-1/2'>
                    <Link href={el.url ?? ''}>
                      <Image
                        ref={imageRef}
                        src={
                          el.picture +
                          `&width=${imageRef.current?.clientWidth}&height=${imageRef.current?.clientWidth}`
                        }
                        fill
                        className='w-full bg-black/5 object-cover transition-transform duration-300'
                        alt='image'
                      />
                    </Link>
                  </CardContent>
                </CarouselItem>
              ))}
          </CarouselContent>
          <div className={'hidden md:group-hover:!flex'}>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        {count > 1 && (
          <div className='w-full pt-3 text-center'>
            <CarouselDots length={count} current={current} />
          </div>
        )}
      </section>
    )
  );
};
