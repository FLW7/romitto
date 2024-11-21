import { Skeleton } from '@/shared/components/skeleton';

export const SuggestsLoading = () => {
  return (
    <div className={'space-y-7 px-4'}>
      {[1, 2, 3].map((el) => (
        <div className={'space-y-2'} key={el}>
          <Skeleton className={'h-[10px] w-1/5'} />
          <Skeleton className={'h-[10px] w-3/5'} />
          <Skeleton className={'h-[10px] w-2/5'} />
        </div>
      ))}
    </div>
  );
};
