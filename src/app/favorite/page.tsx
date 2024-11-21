'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import LeftArrowIcon from '@/assets/icons/arrow-left.svg';
import FavoriteEmptyIcon from '@/assets/icons/empty-favorite.svg';
import { Breadcrumbs } from '@/entities/breadcrumbs';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { ROUTES } from '@/shared/const/routes';
import { useGetFavourites } from '@/shared/hooks/query/use-get-favourites';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { FavoritesLists } from '@/widgets/favorites/favorites-lists';
const breadcrumbs = [
  { name: 'Главная', path: ROUTES.home },
  { name: 'Профиль', path: ROUTES.lk },
  { name: 'Избранное', path: ROUTES.favorite },
];

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data } = useGetFavourites();
  const router = useRouter();

  return (
    <main className='container-xl mx-auto my-5 h-full grow px-4 sm:my-7'>
      {!isMobile && <Breadcrumbs breadcrumbs={breadcrumbs} />}
      <div className='mt-6 flex items-center gap-x-[9px]'>
        <LeftArrowIcon
          className={'md:hidden'}
          onClick={() => {
            router.push('/lk');
          }}
        />
        <Typography variant='desc' className='!text-2xl !font-semibold max-md:!text-xl'>
          Избранное
        </Typography>
      </div>
      {data?.plates?.length === 0 && (
        <div className='mt-[115px] flex flex-col items-center justify-center text-center'>
          <FavoriteEmptyIcon className='mb-5 h-[89px] w-[147px]' />

          <Typography variant='h2' className='mb-3 max-md:text-lg'>
            Пока тут ничего нет
          </Typography>
          <Typography
            variant='desc'
            className='mb-5 text-base font-normal text-secondary max-md:text-sm'
          >
            Здесь будет список избранных блюд
          </Typography>
          <Link href={ROUTES.home}>
            <Button
              variant={isMobile ? 'destructive' : 'outline'}
              className='w-[225px] text-main'
            >
              В меню
            </Button>
          </Link>
        </div>
      )}
      <FavoritesLists />
    </main>
  );
}
