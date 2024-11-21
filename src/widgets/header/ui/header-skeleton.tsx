import { Skeleton } from '@/shared/components/skeleton';

const HeaderSkeleton = () => {
  return (
    <div className='mx-auto flex w-full max-w-[1304px] items-center justify-center'>
      <Skeleton className='my-[30px] h-[50px] w-full bg-lightGrey2/50' />
    </div>
  );
};

export default HeaderSkeleton;
