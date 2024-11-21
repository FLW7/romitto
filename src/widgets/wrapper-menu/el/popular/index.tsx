import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getCategory } from '@/shared/api/get-catalog';
import { CardContent } from '@/shared/components/card';
import Typography from '@/shared/components/typography';
import { QUERY_KEY } from '@/shared/const/query-key';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { scrollToSection } from '@/widgets/header/lib/scroll-to-section';
import { Wrap } from '@/widgets/main/wrap';
import { type ICategory } from '@/widgets/wrapper-menu/types';
const ARR = Array.from({ length: 10 }, (_, i) => i + 1);

export const Popular = () => {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY.category,
    queryFn: async () => await getCategory(),
  });

  const { data: catalog } = useGetCatalog();

  const platesList = catalog?.categories?.map((category: ICategory) => {
    const items: ICartOrderItem[] = Object.values(catalog?.plates)?.filter(
      (item: any) => item.categoryID === String(category.id),
    );

    return items.length > 0 ? category : null;
  });

  const filteredListCategories = platesList?.filter((item: ICategory) => item !== null);

  return data?.length ? (
    <div className='mt-[50px] px-3 max-lg:mt-5'>
      <Wrap
        title='Популярные категории'
        className='font-semibold max-md:text-lg md:text-2xl'
      >
        <div className='grid grid-cols-2 gap-5 max-md:gap-[9px] sm:grid-cols-3 lg:grid-cols-4 min-[1200px]:grid-cols-5 min-[1500px]:grid-cols-6'>
          {(isLoading || !data) &&
            ARR.map((el) => (
              <CardContent key={el} className={'aspect-square sm:h-[160px]'}>
                <div className='h-full w-full animate-pulse rounded-xl bg-black/5' />
              </CardContent>
            ))}
          {data?.map((el, index) => (
            <div
              className={'group relative overflow-hidden rounded-xl sm:h-fit'}
              key={index}
              onClick={() => {
                scrollToSection(
                  filteredListCategories?.findIndex((item: any) => item.id === el.ID) > -1
                    ? filteredListCategories
                        ?.find((item: any) => item.id === el.ID)
                        .id.toString()
                    : '0',
                );
              }}
            >
              <div className='h-[165px] max-h-[165px] max-md:max-h-[120px] max-sm:h-[120px]'>
                <Typography
                  variant={'desc'}
                  className={
                    'absolute left-4 top-3 z-[5] font-semibold text-primary max-md:text-sm md:text-base'
                  }
                >
                  {el.Name}
                </Typography>
                {el.PictureUrl ? (
                  <Image
                    src={el.PictureUrl}
                    className='aspect-video h-full min-h-[110px] cursor-pointer bg-black/5 object-cover transition-transform duration-300 sm:aspect-auto sm:hover:scale-110'
                    width={500}
                    height={200}
                    alt='image'
                  />
                ) : (
                  <div className={'h-full w-full rounded-xl bg-black/5'} />
                )}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </div>
  ) : null;
};
