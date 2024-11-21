import { memo, useState } from 'react';

import { RenderSubCategories } from './render-subcategories';
import { RenderSubCategoriesWithAll } from './render-subcategories-all';

import { ProductCard } from '@/entities/product-card';
import { SUBCATEGORIES_ALL } from '@/global-config';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

interface ICategoryItem {
  plates: ICartOrderItem[];
  id: string;
  name: string;
  itemOrder?: string | undefined;
}

const CatalogItem: React.FC<{
  category: ICategoryItem;
  openModal: (item: ICartOrderItem) => void;
}> = memo(({ category, openModal }) => {
  const [choosenSubCategories, setChoosenSubcategories] = useState<number[]>(
    SUBCATEGORIES_ALL
      ? [Number(category.id)]
      : [
          Number(
            category?.plates.find((item) => Number(item.isSubCategory) === 1)?.id ??
              Number(category.id),
          ),
        ],
  );

  const [choosenAll, setChoosenAll] = useState<{ id: string | null; value: boolean }>({
    id: null,
    value: false,
  });

  const renderSubCategoriesFunc = () => {
    return SUBCATEGORIES_ALL ? (
      <RenderSubCategoriesWithAll
        category={category}
        choosenSubCategories={choosenSubCategories}
        setChoosenSubcategories={setChoosenSubcategories}
        choosenAll={choosenAll}
        setChoosenAll={setChoosenAll}
      />
    ) : (
      <RenderSubCategories
        category={category}
        choosenSubCategories={choosenSubCategories}
        setChoosenSubcategories={setChoosenSubcategories}
      />
    );
  };

  return (
    <div>
      {category?.plates?.filter(
        (subCategory) =>
          Number(subCategory.isSubCategory) === 1 && Number(subCategory.parentID) === 0,
      ).length >= 1
        ? renderSubCategoriesFunc()
        : null}
      <div
        className={
          'mt-[30px] grid grid-cols-2 gap-3 max-md:mt-4 md:grid-cols-3 lg:grid-cols-4'
        }
      >
        {category?.plates?.map((plate, key) => {
          const currentAllSubcategories = category?.plates
            ?.filter(
              (pl) =>
                String(pl.isSubCategory) === '1' &&
                Number(pl.parentID) === Number(choosenSubCategories.at(-2)),
            )
            .map((item) => item.id);

          const isValid =
            Number(plate.parentID) ===
              (choosenAll.value
                ? choosenSubCategories.at(-2)
                : choosenSubCategories.at(-1)) ||
            Number(plate.categoryID) === choosenSubCategories.at(-1) ||
            (choosenAll.value && currentAllSubcategories.includes(plate.parentID));

          return (
            Number(plate.isSubCategory) === 0 &&
            isValid &&
            plate.values[0]?.price && (
              <ProductCard key={key} handleOpenModal={openModal} item={plate} />
            )
          );
        })}
      </div>
    </div>
  );
});

export default CatalogItem;
