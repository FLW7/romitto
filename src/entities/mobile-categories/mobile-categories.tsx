import { forwardRef, useEffect } from 'react';

import MobileCategoryButton from './el/mobile-categoru-button';
import styles from './style.module.css';

import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { useActiveCategory } from '@/shared/state/active-category';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { type ICategory } from '@/widgets/wrapper-menu/types';

const MobileCategories = forwardRef<
  HTMLDivElement,
  {
    onClick?: (id?: string) => void;
    categoriesListRef?: any;
    className?: string;
  }
>(({ onClick, className }, ref) => {
  const { data } = useGetCatalog();
  const {
    categoriesListRef,
    setCategoriesListRef,
    activeCategory,
    clearCategoriesListRef,
  } = useActiveCategory();

  const platesList = (): ICategory[] => {
    return (
      data?.categories
        ?.map((category: ICategory) => {
          const items: ICartOrderItem[] = data?.plates
            ? Object.values(data?.plates)?.filter(
                (item: ICartOrderItem) => String(item.categoryID) === String(category.id),
              )
            : [];

          return items.length > 0 ? category : null;
        })
        .filter(
          (category: ICategory | null): category is ICategory => category !== null,
        ) ?? []
    );
  };

  const filteredListCategories = (): ICategory[] => {
    return platesList().filter((item: ICategory) => item !== null);
  };

  useEffect(() => {
    return () => {
      clearCategoriesListRef();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.hideScroll} ${className} top-[0px] flex items-center gap-x-2 overflow-x-auto overflow-y-hidden whitespace-nowrap`}
    >
      {filteredListCategories()?.map((item, index: number) => {
        return (
          <div
            // ref={categoriesListRef ? categoriesListRef.current?.[key] : null}
            ref={(ref) => {
              if (categoriesListRef.length === 0 && ref !== null) {
                setCategoriesListRef(ref);
              }
            }}
            key={index}
          >
            <MobileCategoryButton
              text={item.name}
              activeIndex={activeCategory}
              id={item.id}
              onClick={onClick}
            />
          </div>
        );
      })}
    </div>
  );
});

export default MobileCategories;
