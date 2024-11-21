import Link from 'next/link';

import { Wrap } from '../wrap';

import { RestaurantCard } from '@/entities/restaurant-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/carousel';
import { ROUTES } from '@/shared/const/routes';
import { useGetAllOrganizations } from '@/widgets/restaurants/rest-lists/model/use-get-all-organizations';

export const Rest = () => {
  const { data } = useGetAllOrganizations();

  return (
    <Wrap
      title='Рестораны'
      className={'!mt-0 sm:!mt-5'}
      classNameWrap={'!mt-1 sm:!mt-[60px]'}
    >
      <Carousel
        opts={{
          align: 'center',
        }}
        className=' grow'
      >
        <CarouselContent className={'mb-[60px]'}>
          {data?.map((rest, index) => (
            <CarouselItem key={index} className='grid basis-auto grid-cols-1 '>
              <Link href={ROUTES.restaurants}>
                <RestaurantCard {...rest} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className={'hidden md:flex'}>
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Wrap>
  );
};
