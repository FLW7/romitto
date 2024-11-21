'use client';

import * as React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/shared/lib/utils';

interface ISliderStyles {
  classNameTrack: string;
  classNameRange: string;
  classNameThumb: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & ISliderStyles
>(
  (
    { className, classNameTrack, classNameRange, classNameThumb, ...properties },
    reference,
  ) => (
    <SliderPrimitive.Root
      ref={reference}
      className={cn(
        'relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50',
        className,
      )}
      {...properties}
    >
      <SliderPrimitive.Track
        className={cn(
          'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary',
          classNameTrack,
        )}
      >
        <SliderPrimitive.Range
          className={cn('absolute h-full bg-primary', classNameRange)}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block h-5 w-5 rounded-full border-2 border-primary transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          classNameThumb,
        )}
      />
    </SliderPrimitive.Root>
  ),
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
