import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center outline-none whitespace-nowrap rounded-md text-[16px] font-[600] transition-colors  disabled:pointer-events-none ',
  {
    variants: {
      variant: {
        default:
          'text-white to-gradient bg-gradient-to-l from-main hover:opacity-[0.9] transition-opacity rounded-full disabled:opacity-50',
        destructive: 'p-0',
        shine:
          'text-primary-foreground animate-shine bg-gradient-to-r from-main via-main/75 to-main bg-[length:400%_100%] ',
        gooeyRight:
          'text-primary-foreground relative to-gradient bg-gradient-to-l from-main z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-zinc-400 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%] ',
        gooeyLeft:
          'text-primary-foreground relative to-gradient bg-gradient-to-l from-main z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-zinc-400 after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%] ',
        outline:
          'text-main hover:border-opacity-0 hover:bg-gradient-to-l hover:from-main hover:to-gradient border border-main rounded-full hover:text-white disabled:text-secondary disabled:border-disabled disabled:bg-disabled',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: '',
        link: 'text-main hover:text-main/90 underline-offset-4 hover:underline font-[500]',
        primary: 'text-primary bg-white rounded-full',
      },
      size: {
        default: 'px-4 py-3',
        destructive: 'p-0',
        sm: 'py-2 px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        primary: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProperties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  ({ className, variant, size, asChild = false, ...properties }, reference) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={reference}
        {...properties}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
