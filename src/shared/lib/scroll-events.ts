import { throttle } from './throttle';

export const scrollToBlock = (index: number, sectionListRef: any, containerRef: any) => {
  if (sectionListRef?.[index]) {
    let offset = Number(sectionListRef[index]?.offsetTop);

    const containerOffset = Number(containerRef.current?.offsetTop);

    offset += index ? containerOffset - 200 : containerOffset - 200;

    window.scrollTo({
      behavior: 'smooth',
      top: offset,
    });
  }
};

export const handleScroll = throttle(
  (
    sectionListRef: any,
    categoriesListRef: any,
    activeCategory: number,
    mobileListRef: any,
    callback: (index: number) => void,
    isMobile: boolean = false,
  ) => {
    const top = window.scrollY + window.innerHeight / 2;

    if (sectionListRef) {
      for (const [index, sec] of sectionListRef?.entries()) {
        const offsetTop = Number(sec?.offsetTop);
        const height = Number(sec?.offsetHeight);

        if (top > offsetTop && top < offsetTop + height + 100) {
          const categoryId = sectionListRef?.[index].id;

          if (isMobile) {
            const rect = categoriesListRef?.[index]?.getBoundingClientRect();
            const leftOffset = rect?.left;
            const rightOffset =
              rect?.left + rect?.width - mobileListRef.current.offsetWidth;

            // Центрирование выбранного элемента
            if (rect) {
              const elementCenter = rect.left + rect.width / 2; // Центр элемента
              const mobileListCenter = mobileListRef.current.offsetWidth / 2; // Центр мобильного списка

              // Проверка, находится ли элемент уже по центру
              const isElementCentered =
                mobileListRef.current.scrollLeft + mobileListCenter >= leftOffset &&
                mobileListRef.current.scrollLeft + mobileListCenter <= rightOffset;

              if (!isElementCentered) {
                mobileListRef.current.scrollTo({
                  behavior: 'smooth',
                  left:
                    mobileListRef.current.scrollLeft + (elementCenter - mobileListCenter),
                });
              }
            }
          }

          categoryId >= 0 && categoryId !== activeCategory
            ? callback(categoryId)
            : callback(activeCategory);

          return;
        }
      }
    }
  },
  300,
);
