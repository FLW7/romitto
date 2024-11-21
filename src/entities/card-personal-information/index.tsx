import { type ReactNode } from 'react';

import { LoaderCircle } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
interface CardPersonalInformationProperties {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

export function LkCardWrapper({
  className,
  children,
  loading,
}: CardPersonalInformationProperties) {
  return (
    <div
      className={cn(
        ' flex h-full flex-col justify-center md:rounded-3xl md:px-[50px] md:py-[40px] md:shadow-cardLk',
        className,
      )}
    >
      {loading ? (
        <div className={'center my-28'}>
          <LoaderCircle className={'h-10 w-10 animate-spin text-main'} />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
