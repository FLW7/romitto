import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Wrap } from '../wrap';

import Arrow from '@/assets/icons-yap/arrow-white.svg';
import { getCategory } from '@/shared/api/get-catalog';
import { Button } from '@/shared/components/button';
import { CardContent } from '@/shared/components/card';
import Typography from '@/shared/components/typography';
import { QUERY_KEY } from '@/shared/const/query-key';
import { ROUTES } from '@/shared/const/routes';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { type ICategory } from '@/widgets/wrapper-menu/types';
const ARR = Array.from({ length: 10 }, (_, i) => i + 1);

export const Popular = () => {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY.category,
    queryFn: async () => await getCategory(),
  });

  const router = useRouter();

  const { data: catalog } = useGetCatalog();

  const platesList = catalog?.categories?.map((category: ICategory) => {
    const items: ICartOrderItem[] = Object.values(catalog?.plates)?.filter(
      (item: any) => item.categoryID === String(category.id),
    );

    return items.length > 0 ? category : null;
  });

  const filteredListCategories = platesList?.filter((item: ICategory) => item !== null);

  return data?.length ? (
    <Wrap
      title='Популярные категории'
      className='font-semibold max-md:text-lg md:text-2xl'
    >
      <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'>
        {(isLoading || !data) &&
          ARR.map((el) => (
            <CardContent key={el} className={'aspect-square sm:h-[160px]'}>
              <div className='h-full w-full animate-pulse rounded-[12px] bg-black/5' />
            </CardContent>
          ))}
        {data?.map((el, index) => (
          <Link
            href={ROUTES.menu()}
            className={'group relative overflow-hidden rounded-[12px] sm:h-fit'}
            key={index}
            onClick={() => {
              sessionStorage.setItem(
                'cat',

                filteredListCategories?.findIndex((item: any) => item.id === el.ID) > -1
                  ? filteredListCategories
                      ?.find((item: any) => item.id === el.ID)
                      .id.toString()
                  : 'null',
              );
            }}
          >
            <div className='max-h-[180px] min-h-[110px]'>
              <Typography
                variant={'desc'}
                className={
                  'absolute left-4  top-3 z-10 font-semibold text-primary max-md:text-sm md:text-base'
                }
              >
                {el.Name}
              </Typography>
              {el.PictureUrl ? (
                <Image
                  src={el.PictureUrl}
                  className='aspect-video h-full min-h-[110px] bg-black/5 object-cover transition-transform duration-300 sm:aspect-auto sm:hover:scale-110'
                  width={500}
                  height={200}
                  alt='image'
                />
              ) : (
                <div className={'h-full w-full rounded-[12px] bg-black/5'} />
              )}
            </div>
          </Link>
        ))}
        <Link
          className={'relative hidden items-end rounded-[12px] bg-main sm:h-full md:flex'}
          href={ROUTES.menu()}
        >
          <Arrow className={'absolute right-4 top-4 h-6 w-6'} />
          <Typography
            variant={'desc'}
            className={' max-w-[70%] p-6 font-semibold text-white sm:text-[20px]'}
          >
            Открыть все меню
          </Typography>
        </Link>
      </div>
      <div className='max-sm:px-4 md:hidden'>
        <Button
          className='mt-5 flex h-[50px] w-full'
          onClick={() => {
            router.push(ROUTES.menu());
          }}
        >
          Открыть все меню
        </Button>
      </div>
    </Wrap>
  ) : null;
};
