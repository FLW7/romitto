'use client';

import React, { useState, useEffect } from 'react';

import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/shared/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    classNameIndicator?: string;
  }
>(({ className, classNameIndicator, value, ...properties }, reference) => {
  const [valueValid, setValueValid] = useState(value);
  const maxValue = 100;

  useEffect(() => {
    setValueValid(maxValue - (value ?? 0) >= 0 ? maxValue - (value ?? 0) : 0);
  }, [value, maxValue]);

  return (
    <ProgressPrimitive.Root
      ref={reference}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className,
      )}
      {...properties}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 bg-primary transition-all',
          classNameIndicator,
        )}
        style={{ transform: `translateX(-${valueValid}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
