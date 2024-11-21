import { forwardRef } from 'react';

import MobileCategoryButtonEvent from './el/mobile-category-button-event';
import styles from './style.module.css';

const MobileCategoriesEvents = forwardRef<
  HTMLDivElement,
  {
    onClick: (value: number) => void;
    categories: Array<{ id: number; value: string; name: string }>;
    className?: string;
    activeCategory: number;
  }
>(({ onClick, categories, className, activeCategory }, ref) => {
  return (
    <div
      ref={ref}
      className={`${styles.hideScroll} ${className} top-[0px] flex items-center gap-x-2 overflow-x-auto overflow-y-hidden whitespace-nowrap`}
    >
      {categories.map(
        (item: { id: number; value: string; name: string }, index: number) => {
          return (
            <div key={index}>
              <MobileCategoryButtonEvent
                text={item.name}
                activeIndex={activeCategory}
                index={index}
                onClick={onClick}
              />
            </div>
          );
        },
      )}
    </div>
  );
});

export default MobileCategoriesEvents;
