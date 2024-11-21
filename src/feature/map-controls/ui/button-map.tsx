import { type ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

interface ButtonProperties {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
}
export const ButtonMap = ({ children, onClick, className }: ButtonProperties) => {
  return (
    <button
      type={'button'}
      className={cn(
        className,
        'flex h-12 w-12 items-center justify-center rounded-full bg-bgTetriary shadow transition hover:shadow-lg',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
