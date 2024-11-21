'use client';

import * as React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import CheckIcon from '@/assets/icons/check.svg';
import { cn } from '@/shared/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...properties }, reference) => (
  <CheckboxPrimitive.Root
    ref={reference}
    className={cn(
      'ring-offset-background focus-visible:ring-ring data-[state=checked]:text-primary-foreground  peer h-6 w-6 shrink-0 rounded-full bg-[#F0F0F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-none data-[state=checked]:border-main data-[state=checked]:bg-main',
      className,
    )}
    {...properties}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-white')}
    >
      <CheckIcon width={10} height={10} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
