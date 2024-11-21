'use client';

import * as React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import styles from './style.module.css';

import CheckIcon from '@/assets/icons/check.svg';
import { cn } from '@/shared/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    variant: 'round' | 'square';
  }
>(({ className, checked, variant, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        variant === 'round' && (checked ? 'border-main' : 'border-secondary'),
        variant === 'round' ? styles.round : styles.square,
        className,
      )}
      {...props}
    >
      {variant === 'round' && (
        <div className='flex items-center justify-center'>
          <Circle
            className={`h-[14px] w-[14px] ${checked ? 'fill-main' : 'fill-secondary'} ${checked ? 'text-main' : 'text-secondary'}`}
          />
        </div>
      )}

      {variant === 'square' && (
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <CheckIcon className='h-2.5 w-2.5' />
        </RadioGroupPrimitive.Indicator>
      )}
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
