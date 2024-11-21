import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'bg-background ring-offset-background file:bg-transparent placeholder:text-muted-foreground focus-visible:ring-ring flex h-[50px] w-full truncate rounded-xl border border-primary/10 bg-bgSecondary px-4 pr-9 text-primary file:font-medium focus-visible:outline-none disabled:opacity-50 md:h-[60px]',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
