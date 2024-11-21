import { type ReactNode } from 'react';

import IconBonus1 from '@/assets/icons/bonus-1.svg';
import IconBonus2 from '@/assets/icons/bonus-2.svg';
import IconBonus3 from '@/assets/icons/bonus-3.svg';
import IconBonus4 from '@/assets/icons/bonus-4.svg';
import IconBonus5 from '@/assets/icons/bonus-5.svg';
import IconBonus6 from '@/assets/icons/bonus-6.svg';
import IconBonus7 from '@/assets/icons/bonus-7.svg';
import IconBonus8 from '@/assets/icons/bonus-8.svg';
import BonusInfoCard from '@/entities/bonus-info-card/bonus-info-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/carousel';

const icons = [
  <IconBonus1 key={1} width={40} height={40} />,
  <IconBonus2 key={2} width={40} height={40} />,
  <IconBonus3 key={3} width={40} height={40} />,
  <IconBonus4 key={4} width={40} height={40} />,
  <IconBonus5 key={5} width={40} height={40} />,
  <IconBonus6 key={6} width={40} height={40} />,
  <IconBonus7 key={7} width={40} height={40} />,
  <IconBonus8 key={8} width={40} height={40} />,
];

const BonusCarousel: React.FC<{
  data: Array<{ title: string; text: string }>;
}> = ({ data }) => {
  const newArray = data?.reduce(
    (
      acc: Array<Array<{ title: string; text: string; icon: ReactNode }>>,
      curr,
      index,
      arr: Array<{ title: string; text: string }>,
    ) => {
      if (index % 2 === 0) {
        acc.push([
          { ...curr, icon: icons[index] },
          { ...arr[index + 1], icon: icons[index + 1] },
        ]);
      }

      return acc;
    },
    [],
  );

  return (
    <Carousel className='mt-[50px]'>
      <CarouselContent className='ml-4 h-[440px] md:ml-4'>
        {newArray?.map((item, key) => {
          return (
            <CarouselItem
              className='basis-1/4 pr-[92px] max-[1360px]:basis-1/3 max-[1060px]:basis-[40%] max-[930px]:basis-1/2 max-sm:basis-auto'
              key={key}
            >
              <BonusInfoCard items={item} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselNext className='right-[5%] xl:hidden' />
      <CarouselPrevious className='left-[5%] xl:hidden' />
    </Carousel>
  );
};

export default BonusCarousel;
