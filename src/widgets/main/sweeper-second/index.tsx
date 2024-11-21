'use client';

import { useEffect, useRef, useState } from 'react';

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

export const SweeperSecond = () => {
  const { data, isPending, isLoading, isError } = useGetCatalog();
  const load = isPending || isLoading;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  const banners = data?.bannersAll?.filter((el) => el.type === '1');

  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    (banners?.length ?? 0) > 0 && (
      <section className='group mt-6 flex flex-col md:px-3'>
        <Carousel
          setApi={setApi}
          opts={{
            dragFree: true,
            align: 'start',
          }}
          className='grow'
        >
          <CarouselContent className={'!ml-0 p-0 max-md:mr-4'}>
            {(load || isError) &&
              ARR.map((el) => (
                <CarouselItem key={el} className={'mr-2 sm:mr-[20px]'}>
                  <CardContent className='relative h-[196px] w-[165px] md:h-[350px] md:w-[280px] '>
                    <div className='h-full w-full animate-pulse rounded-[22px] bg-black/5' />
                  </CardContent>
                </CarouselItem>
              ))}

            {banners
              ?.filter((el) => el.type === '1')
              ?.map((el, index) => (
                <CarouselItem
                  key={index}
                  className={
                    'max-w-[305px] basis-1/4 pl-0 max-md:ml-3 max-md:w-[132px] max-md:basis-auto max-md:first:ml-4 md:mr-5'
                  }
                >
                  <CardContent className='group relative aspect-[305/382] overflow-hidden rounded-[20px] max-md:rounded-[12px]'>
                    <Link href={el?.url ?? ''} className={''}>
                      <Image
                        ref={imageRef}
                        src={
                          el.picture +
                          `&width=${imageRef.current?.clientWidth}&height=${imageRef.current?.clientWidth}`
                        }
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='bg-black/5 object-cover'
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
