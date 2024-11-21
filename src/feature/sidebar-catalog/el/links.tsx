import Link from 'next/link';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { useGetNavigation } from '@/shared/hooks/query/use-get-navigation';
import { useModal } from '@/shared/state/modal';
export const Links = () => {
  const { onClose } = useModal();
  const { data } = useGetNavigation();

  return (
    <div>
      {/* <Typography variant='desc' className='text-[22px] font-semibold leading-[31px]'>
        Меню
      </Typography> */}
      <div className={'mt-4 flex flex-col gap-y-[18px]'}>
        {data?.data?.map(({ url, name, id }) => (
          <Button
            variant={'destructive'}
            className={'w-full p-0'}
            key={id}
            onClick={() => {
              onClose();
            }}
          >
            <Link href={url} className={'flex w-full items-center'}>
              <Typography variant={'desc'} className={'text-start text-base font-normal'}>
                {name}
              </Typography>

              <div className={'ml-auto'}>
                <ArrowRight className={'h-3 w-3 stroke-black/20'} />
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
