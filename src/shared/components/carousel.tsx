'use client';

import * as React from 'react';

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

import useMediaQuery from '../hooks/use-media-query';

import ArrowLeftShort from '@/assets/icons/arrow-left-short.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowRight from '@/assets/icons/arrow-right.svg';
import { Button } from '@/shared/components/button';
import { cn } from '@/shared/lib/utils';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProperties {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  showRadioButtons?: boolean;
  imagesLength?: number;
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProperties = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProperties;

const CarouselContext = React.createContext<CarouselContextProperties | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProperties
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      showRadioButtons = false,
      imagesLength,
      children,
      ...properties
    },
    ref,
  ) => {
    const [carouselReference, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    );
    const [canScrollPrevious, setCanScrollPrevious] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleRadioChange = (index: number) => {
      setSelectedIndex(index);
      api?.scrollTo(index);
    };

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrevious(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrevious = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrevious();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrevious, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef: carouselReference,
          api,
          opts,
          orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev: scrollPrevious,
          scrollNext,
          canScrollPrev: canScrollPrevious,
          canScrollNext,
          ...properties,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role='region'
          aria-roledescription='carousel'
          {...properties}
        >
          {children}
          {showRadioButtons && (
            <div className='mt-5 flex justify-center space-x-2'>
              {Array.from({ length: imagesLength ?? 0 }).map((_, index) => (
                <label key={index} className='inline-flex cursor-pointer items-center'>
                  <input
                    type='radio'
                    name='carouselRadio'
                    checked={selectedIndex === index}
                    onChange={() => {
                      handleRadioChange(index);
                    }}
                    className='hidden'
                  />
                  <span
                    className={cn(
                      'inline-block h-[12px] w-[12px] rounded-full transition-colors',
                      {
                        'border-black/10 border-main bg-main': selectedIndex === index,
                        'bg-lightGray': selectedIndex !== index,
                      },
                    )}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isTransparent?: boolean;
    heightTransparent?: number;
    classNameContent?: string;
  }
>(
  (
    {
      className,
      isTransparent = false,
      heightTransparent = 430,
      classNameContent,
      ...properties
    },
    ref,
  ) => {
    const { carouselRef, orientation } = useCarousel();

    const isSmallScreen = useMediaQuery('(max-width: 735px)');

    return (
      <div ref={carouselRef} className={cn(classNameContent, 'h-full overflow-hidden')}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
            className,
          )}
          {...properties}
        />
        {isTransparent && (
          <>
            <div
              className={`absolute left-0 top-0 h-[${heightTransparent}px] w-1/5 bg-gradient-to-r from-white ${isSmallScreen && 'max-h-[0px]'}`}
            ></div>
            <div
              className={`absolute right-0 top-0 h-[${heightTransparent}px] w-1/5 bg-gradient-to-l from-white ${isSmallScreen && 'max-h-[0px]'}`}
            ></div>
          </>
        )}
      </div>
    );
  },
);

CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...properties }, reference) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={reference}
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...properties}
    />
  );
});

CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof Button>, 'isArrowShort'> & {
    isArrowShort?: boolean;
  }
>(
  (
    {
      className,
      variant = 'destructive',
      size = 'icon',
      isArrowShort = 'false',
      ...properties
    },
    reference,
  ) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={reference}
        variant={variant}
        size={size}
        className={cn(
          'absolute  h-[50px] w-[50px] rounded-full border-white bg-white shadow-cardLk hover:bg-white',
          !canScrollPrev && 'hidden',
          orientation === 'horizontal'
            ? '-left-6 top-1/2 -translate-y-1/2'
            : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...properties}
      >
        {isArrowShort ? (
          <ArrowLeftShort className='h-4 w-4' />
        ) : (
          <ArrowLeft className='h-4 w-4' />
        )}
        <span className='sr-only'>Previous slide</span>
      </Button>
    );
  },
);

CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'destructive', size = 'icon', ...properties }, reference) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={reference}
      variant={variant}
      size={size}
      className={cn(
        'absolute  h-[50px] w-[50px] rounded-full border-white bg-white shadow-cardLk hover:bg-white',
        !canScrollNext && 'hidden',
        orientation === 'horizontal'
          ? '-right-6 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...properties}
    >
      <ArrowRight className='h-4 w-4' />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
});

CarouselNext.displayName = 'CarouselNext';

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
