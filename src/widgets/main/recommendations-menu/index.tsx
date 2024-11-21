'use client';

import CartRecCard from '@/feature/cart-rec-card/cart-rec-card';
import { CardContent } from '@/shared/components/card';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/carousel';
import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem, type TCartRecCard } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

export const RecommendationsMenu: React.FC<{ items: TCartRecCard[] }> = ({ items }) => {
  const { onOpen } = useModal();
  const { orders } = useCart();

  const openModal = (item: ICartOrderItem) => {
    onOpen('detailMeal', item);
  };

  return (
    (items?.length ?? 0) > 0 && (
      <section className='mt-6 flex flex-col md:px-3'>
        <Typography
          variant='desc'
          className='px-3 font-semibold text-primary max-md:text-lg md:text-2xl'
        >
          Выгодно
        </Typography>
        <Carousel
          opts={{
            dragFree: true,
            align: 'start',
          }}
          className='grow'
        >
          <CarouselContent className={'!ml-0 p-0 pl-4 max-md:mr-4'}>
            {items?.map((item, index) => (
              <>
                <CarouselItem
                  key={index}
                  className={
                    '!mr-3 max-w-[300px] basis-[20%] pl-0 max-[1300px]:basis-[25%] max-lg:basis-1/3 max-[850px]:basis-[100%] max-md:ml-3 max-md:first:ml-4 md:mr-5'
                  }
                >
                  <CardContent className='my-4 overflow-hidden rounded-3xl shadow-productCart'>
                    <CartRecCard
                      item={item}
                      checked={orders?.some((order) => {
                        if (!order || !item) {
                          return false;
                        }

                        return order.id === item.id;
                      })}
                      openModal={openModal}
                      className='mt-0 shadow-none'
                    />
                  </CardContent>
                </CarouselItem>
                <CarouselItem
                  key={index}
                  className={
                    '!mr-3 max-w-[300px] basis-[20%] pl-0 max-[1300px]:basis-[25%] max-lg:basis-1/3 max-[850px]:basis-[100%] max-md:ml-3 max-md:first:ml-4 md:mr-5'
                  }
                >
                  <CardContent className='my-4 overflow-hidden rounded-3xl shadow-productCart'>
                    <CartRecCard
                      item={item}
                      checked={orders?.some((order) => {
                        if (!order || !item) {
                          return false;
                        }

                        return order.id === item.id;
                      })}
                      openModal={openModal}
                      className='mt-0 shadow-none'
                    />
                  </CardContent>
                </CarouselItem>
              </>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    )
  );
};
