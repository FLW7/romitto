import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getBanner } from '../api';
import { configSlider } from '../lib/config-slider';

import styles from './styles.module.css';

import PizzaImage from '@/assets/images/promo-slider/first-promo.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/carousel';
import useHover from '@/shared/hooks/use-hover';
import useMediaQuery from '@/shared/hooks/use-media-query';

const images = [PizzaImage, PizzaImage, PizzaImage, PizzaImage, PizzaImage];

const PromoSlider = () => {
  const [isHovered, handleMouseEnter, handleMouseLeave] = useHover();

  const isSmallScreen = useMediaQuery('(max-width: 375px)');
  const isLargeScreen = useMediaQuery('(max-width: 1120px)');

  const { data } = useQuery({
    queryKey: [`banner`],
    queryFn: async () => await getBanner(),
  });

  return (
    <div
      className={`${isSmallScreen ? 'm-0 max-h-[140px]' : 'relative mx-auto mt-[22px] h-[430px]'}`}
    >
      <Carousel
        showRadioButtons
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        imagesLength={images.length}
        opts={configSlider.sliderOptions}
        plugins={configSlider.sliderPlugins}
        className={`w-full ${isSmallScreen && 'mt-[15px] h-[140px]'}`}
      >
        <CarouselContent
          isTransparent
          className={`h-[400px] ${isSmallScreen ? 'h-[140px]' : 'w-screen'}`}
        >
          {data?.banners?.map(({ image, id }: any) => (
            <CarouselItem
              key={id}
              className={`flex justify-center gap-1 ${isSmallScreen ? 'h-[140px]' : 'ml-[10px] mr-[10px] lg:max-w-[1024px] xl:max-w-[1304px] 2xl:max-w-[1480px]'}`}
            >
              <div
                className={`flex justify-center object-cover ${isSmallScreen ? 'max-h-[140px] max-w-[375px] rounded-xl' : 'rounded-xl lg:max-w-[1024px] xl:max-w-[1304px] 2xl:max-w-[1480px]'}`}
              >
                <Image
                  priority={true}
                  src={image}
                  alt={image}
                  width={isSmallScreen ? 343 : 1480}
                  height={isSmallScreen ? 140 : 400}
                  className={`rounded-xl object-fill lg:max-w-[1024px] xl:max-w-[1304px] 2xl:max-w-[1500px] ${isSmallScreen && 'h-[140px] max-w-[375px] rounded-xl'}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {isSmallScreen || isLargeScreen ? null : (
          <>
            <CarouselPrevious
              isArrowShort
              className={`${isHovered ? 'opacity-100' : 'opacity-0'} ${styles.arrow_pos_left} ${styles.arrow_style} ${isSmallScreen && 'left-[0] top-1/2'}`}
            />
            <CarouselNext
              className={`${isHovered ? 'opacity-100' : 'opacity-0'}  ${styles.arrow_pos_right} ${styles.arrow_style} ${isSmallScreen && 'right-[0] top-1/2'}`}
            />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default PromoSlider;
