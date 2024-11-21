import { type Dispatch, type SetStateAction } from 'react';

import MobileCategoryButton from '@/entities/mobile-categories/el/mobile-categoru-button';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

interface ICategoryItem {
  plates: ICartOrderItem[];
  id: string;
  name: string;
  itemOrder?: string | undefined;
}

export const RenderSubCategories: React.FC<{
  choosenSubCategories: number[];
  category: ICategoryItem;
  setChoosenSubcategories: Dispatch<SetStateAction<number[]>>;
}> = ({ choosenSubCategories, category, setChoosenSubcategories }) => {
  return choosenSubCategories.map((item, index) => {
    const currentItem = category?.plates?.find(
      (subCategory) => Number(subCategory.id) === item,
    );

    const currentParentID = currentItem?.parentID;

    return (
      <div key={index} className='mt-5 flex flex-wrap gap-2 max-md:mt-3'>
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
                active={Number(subCategory.id) === choosenSubCategories[index]}
                onClick={() => {
                  if (Number(subCategory.id) === choosenSubCategories[index]) {
                    return;
                  }
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
