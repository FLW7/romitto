import Link from 'next/link';

import Typography from '@/shared/components/typography';

export const Navigation = () => {
  // const { data } = useGetNavigation();

  return (
    <div className='border-black/10 max-lg:border-t max-lg:py-5'>
      {/* <Typography variant={'p2'} className={'mb-4 font-semibold'}>
        Навигация
      </Typography> */}

      <ul className={'flex flex-col gap-x-10 gap-y-1 lg:h-[110px] lg:flex-wrap'}>
        {/* {data?.data?.slice(0, 8)?.map?.(({ url, name, id }) => (
          <li key={id} className={'last:mb-0'}>
            <Link href={url}>
              <Typography
                variant={'desc'}
                className={'!text-base font-semibold text-secondary hover:text-main'}
              >
                {name}
              </Typography>
            </Link>
          </li>
        ))} */}
        {/* <li className={'last:mb-0'}>
          <Link
            href={
              'https://docs.google.com/spreadsheets/d/1xAhPwtbGUnYMG6FWQPy_ndkNiGiJGgRbyHr4RJTsjCs/edit?usp=sharing'
            }
          >
            <Typography
              variant={'desc'}
              className={'!text-base font-semibold text-secondary hover:text-main'}
            >
              Калорийность и состав
            </Typography>
          </Link>
        </li> */}
        <li className={'last:mb-0'}>
          <Link href={'/legal'}>
            <Typography
              variant={'desc'}
              className={'!text-base font-semibold text-secondary hover:text-main'}
            >
              Правовая информация
            </Typography>
          </Link>
        </li>
      </ul>
    </div>
  );
};
