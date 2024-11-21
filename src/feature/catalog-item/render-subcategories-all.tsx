import { type Dispatch, type SetStateAction } from 'react';

import MobileCategoryButton from '@/entities/mobile-categories/el/mobile-categoru-button';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

interface ICategoryItem {
  plates: ICartOrderItem[];
  id: string;
  name: string;
  itemOrder?: string | undefined;
}

export const RenderSubCategoriesWithAll: React.FC<{
  choosenSubCategories: number[];
  category: ICategoryItem;
  setChoosenSubcategories: Dispatch<SetStateAction<number[]>>;
  setChoosenAll?: Dispatch<SetStateAction<{ id: string | null; value: boolean }>>;
  choosenAll?: { id: string | null; value: boolean };
}> = ({
  choosenSubCategories,
  category,
  setChoosenSubcategories,
  setChoosenAll,
  choosenAll,
}) => {
  return choosenSubCategories.map((item, index) => {
    const currentItem = category?.plates?.find(
      (subCategory) => Number(subCategory.id) === item,
    );

    const currentParentID = currentItem?.parentID;

    return (
      <div key={index} className='mt-5 flex flex-wrap gap-2 max-md:mt-3'>
        <MobileCategoryButton
          text='Все'
          active={
            index === 0
              ? Number(category.id) === choosenSubCategories[index]
              : choosenAll?.id === currentParentID?.toString() &&
                choosenAll?.value &&
                index === choosenSubCategories.length - 1
          }
          onClick={() => {
            if (
              Number(category.id) === choosenSubCategories[index] ||
              (choosenAll?.id === currentParentID?.toString() &&
                choosenAll?.value &&
                index === choosenSubCategories.length - 1)
            ) {
              return;
            }

            if (index === 0) {
              setChoosenSubcategories((prev) => {
                const subCategoriesTemp = [...prev];

                subCategoriesTemp[index] =
                  Number(currentParentID) === 0
                    ? Number(category.id)
                    : Number(currentParentID);

                const nextSubCategories = category?.plates.filter(
                  (item) => Number(item.parentID) === Number(category.id),
                );

                if (nextSubCategories.length === 0) {
                  subCategoriesTemp.splice(index + 1, 1);
                }

                return subCategoriesTemp;
              });
              setChoosenAll && setChoosenAll({ id: null, value: false });
            } else {
              setChoosenAll &&
                setChoosenAll({ id: currentParentID?.toString() ?? null, value: true });

              setChoosenSubcategories((prev) => {
                const subCategoriesTemp = [...prev];

                const nextSubCategories = category?.plates.filter(
                  (item) => Number(item.parentID) === Number(category.id),
                );

                if (nextSubCategories.length === 0) {
                  subCategoriesTemp.splice(index + 1, 1);
                }

                return subCategoriesTemp;
              });
            }
          }}
          isSub={true}
        />
        {category?.plates
          ?.filter(
            (subCategory) =>
              Number(subCategory.isSubCategory) === 1 &&
              Number(subCategory.parentID) ===
                (index === 0 ? 0 : Number(currentParentID)),
          )
          ?.map((subCategory, key) => {
            return (
              <MobileCategoryButton
                key={`${key}-${index}`}
                text={subCategory.name}
                active={
                  (index === 0 ||
                    choosenAll?.id !== currentParentID?.toString() ||
                    !choosenAll?.value) &&
                  Number(subCategory.id) === choosenSubCategories[index]
                }
                onClick={() => {
                  if (
                    (index === 0 ||
                      (choosenAll?.id === currentParentID?.toString() &&
                        !choosenAll?.value)) &&
                    Number(subCategory.id) === choosenSubCategories[index]
                  ) {
                    return;
                  }
                  setChoosenAll && setChoosenAll({ id: null, value: false });
                  setChoosenSubcategories((prev) => {
                    const subCategoriesTemp = [...prev];

                    subCategoriesTemp[index] = Number(subCategory.id);

                    const nextSubCategories = category?.plates.filter(
                      (item) =>
                        item.parentID === subCategory.id &&
                        String(item.isSubCategory) === '1',
                    );

                    if (nextSubCategories.length > 0) {
                      if (subCategoriesTemp[index + 1]) {
                        subCategoriesTemp[index + 1] = Number(nextSubCategories[0].id);
                      } else {
                        setChoosenAll &&
                          setChoosenAll({
                            id: nextSubCategories[0].parentID?.toString() ?? null,
                            value: true,
                          });
                        subCategoriesTemp.push(Number(nextSubCategories[0].id));
                      }
                    } else {
                      subCategoriesTemp.splice(index + 1, 1);
                    }

                    return subCategoriesTemp;
                  });
                }}
                isSub={true}
              />
            );
          })}
      </div>
    );
  });
};
