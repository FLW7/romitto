import { memo, useCallback, useEffect } from 'react';

import { type ICategory } from '../wrapper-menu/types';

import CatalogItem from '@/feature/catalog-item/catalog-item';
import Typography from '@/shared/components/typography';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { useActiveCategory } from '@/shared/state/active-category';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

const Catalog = memo(() => {
  const modal = useModal();
  const { data } = useGetCatalog();
  const { sectionsListRef, setSectionsListRef, clearSectionListRef } =
    useActiveCategory();

  const handleOpen = (item: ICartOrderItem) => {
    modal.onOpen('detailMeal', item);
  };

  const fillCategories = useCallback(() => {
    const filledCategories = [];

    if (data?.plates) {
      for (const category of data?.categories as ICategory[]) {
        const categoryPlates = data?.plates
          ? Object.values(data?.plates)?.filter(
              (plate) => Number(plate.categoryID) === Number(category.id),
            )
          : [];

        filledCategories.push({ ...category, plates: categoryPlates });
      }
    }

    return filledCategories;
  }, [data?.categories]);

  useEffect(() => {
    return () => {
      clearSectionListRef();
    };
  }, []);

  return (
    <div className='mb-[60px] flex flex-col gap-y-[50px] px-3 max-sm:mt-4 sm:mt-[50px]'>
      {fillCategories().map((category, index) => {
        return category.plates.length > 0 ? (
          <div
            id={category.id}
            key={index}
            ref={(ref) => {
              if (sectionsListRef.length === 0 && ref !== null) {
                setSectionsListRef(ref);
              }
            }}
          >
            <div className={`w-full section-${category.id}`} data-href={category.id}>
              <div>
                <Typography
                  variant='desc'
                  className='text-[26px] font-semibold text-primary max-md:mb-4 max-md:text-lg'
                >
                  {category.name}
                </Typography>
              </div>
            </div>
            <CatalogItem category={category} openModal={handleOpen} />
          </div>
        ) : null;
      })}
    </div>
  );
});

export default Catalog;
