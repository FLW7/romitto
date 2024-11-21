import { useEffect, useState } from 'react';

import PlateRecCard from '@/feature/plate-rec-card/plate-rec-card';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/carousel';
import { useModal } from '@/shared/state/modal';
import type { ICartOrderItem } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

export const Recomendations = ({ recomendations }: ICartOrderItem) => {
  const { orders, plates } = useCart();
  const { onOpen } = useModal();
  const getRecommendations = (recsIds: string[] = []) => {
    const recommendationPlates = [];

    for (const recId of recsIds) {
      for (const plate of plates) {
        if (plate.id.toString() === recId) {
          recommendationPlates.push(plate);
        }
      }
    }

    return recommendationPlates;
  };

  const [newRecommendations, setNewRecommendations] = useState<any[]>();

  useEffect(() => {
    setNewRecommendations(getRecommendations(recomendations));
  }, [recomendations]);

  return (
    (newRecommendations?.length ?? 0) > 0 && (
      <div className='rounded-xl bg-white py-[18px]'>
        <div className='pl-[16px] font-semibold'>Что-нибудь еще?</div>
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className='px-3 pb-4'>
            {newRecommendations?.map((item: any) => {
              return (
                <CarouselItem key={item.id} className='basis-[80%]'>
                  <PlateRecCard
                    toggle
                    openModal={() => {
                      onOpen('detailMeal', item);
                    }}
                    item={item}
                    checked={orders?.some((order) => {
                      if (!order || !item) {
                        return false;
                      }

                      return order.id === item.id;
                    })}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    )
  );
};
