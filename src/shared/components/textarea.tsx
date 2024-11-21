import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'bg-background placeholder:text-muted-foreground focus-visible:ring-ring  scrollbar-thin flex min-h-[100px] w-full rounded-md border border-black/10 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
