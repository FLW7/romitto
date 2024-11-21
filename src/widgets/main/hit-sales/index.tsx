'use client';

import { Wrap } from '../wrap';

import { ProductCard } from '@/entities/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/carousel';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

const ARR = Array.from({ length: 10 }, (_, i) => i + 1);

export const HitSales = () => {
  const { onOpen } = useModal();
  const { data, isLoading } = useGetCatalog();

  const openModal = (item: ICartOrderItem) => {
    onOpen('detailMeal', item);
  };

  return (
    (data?.isHit?.length ?? 0) > 0 && (
      <Wrap title='Хит продаж' className={'!mb-0'}>
        <Carousel
          opts={{
            dragFree: true,
            align: 'start',
          }}
          className=' grow'
        >
          <CarouselContent className='flex py-4 sm:px-3'>
            {(isLoading || !data) &&
              ARR.map((el) => (
                <CarouselItem
                  key={el}
                  className='grid h-full w-full basis-1/2 grid-cols-1  lg:basis-1/3 xl:basis-1/4'
                >
                  <div className='h-full w-full animate-pulse rounded-[12px] bg-black/5' />
                </CarouselItem>
              ))}

            {data?.isHit?.map((item, index) => (
              <CarouselItem
                key={index}
                className='grid basis-1/2 grid-cols-1 pl-3 lg:basis-1/3 xl:basis-1/4'
              >
                <ProductCard
                  item={item}
                  handleOpenModal={() => {
                    openModal(item);
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className={'hidden md:flex'}>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </Wrap>
    )
  );
};
