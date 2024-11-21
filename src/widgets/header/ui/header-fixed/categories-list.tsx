import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { scrollToSection } from '../../lib/scroll-to-section';

import OtherCategories from './other-categories';

import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/utils';
import { useActiveCategory } from '@/shared/state/active-category';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { type ICategory } from '@/widgets/wrapper-menu/types';

interface ICategoriesListProps {
  isCloseSearch?: boolean;
  isFixed?: boolean;
  onClose?: () => void;
}

const CategoriesList: React.FC<ICategoriesListProps> = ({
  isCloseSearch,
  onClose,
  isFixed,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { activeCategory } = useActiveCategory();

  const isTablet = useMediaQuery('(max-width:1300px)');
  const [spliceCount, setSpliceCount] = useState(9);

  const { data } = useGetCatalog();
  const platesList: ICategory[] = data?.categories?.map((category: ICategory) => {
    const items: ICartOrderItem[] = data?.plates
      ? Object.values(data?.plates)?.filter(
          (item: any) => item.categoryID === String(category.id),
        )
      : [];

    return items.length > 0 ? category : null;
  });

  const filteredListCategories = platesList?.filter((item: ICategory) => item !== null);

  useEffect(() => {
    if (isTablet) {
      if (isFixed) {
        setSpliceCount(5);
      } else {
        setTimeout(() => {
          setSpliceCount(6);
        }, 300);
      }
    } else {
      if (isFixed) {
        setSpliceCount(6);
      } else {
        setTimeout(() => {
          setSpliceCount(8);
        }, 300);
      }
    }
  }, [spliceCount, isTablet, filteredListCategories]);

  const categoriesSpliced = filteredListCategories
    ? [...filteredListCategories]?.splice(0, spliceCount)
    : [];
  const categoriesOther = filteredListCategories
    ? [...filteredListCategories]?.splice(spliceCount)
    : [];

  return (
    <div className={`flex w-full select-none items-center gap-[22px] duration-500`}>
      {categoriesSpliced?.map((item: { id: string; name: string }, key: number) => {
        return (
          <div
            key={item.id}
            className={cn(
              'flex cursor-pointer whitespace-nowrap text-base font-semibold leading-[17px] text-primary duration-100 hover:text-main',
              Number(activeCategory) === Number(item.id) &&
                pathname === '/' &&
                '!text-main',
            )}
            onClick={() => {
              isCloseSearch && onClose?.();
              if (pathname === '/') {
                scrollToSection(String(item.id));
              } else {
                router.push('/');
                sessionStorage.setItem('cat', String(item.id));
              }
            }}
          >
            {item.name}
          </div>
        );
      })}
      {categoriesOther?.length > 0 && <OtherCategories categories={categoriesOther} />}
    </div>
  );
};

export default CategoriesList;
