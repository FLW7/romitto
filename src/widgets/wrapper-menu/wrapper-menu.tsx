import { useRef, useEffect, useState } from 'react';

import { useWindowEventListener } from 'rooks';

import { useCart } from '../cart-widget/state';
import CatalogSidebar from '../catalog-sidebar/catalog-sidebar';
import Header from '../header';
import { scrollToSection } from '../header/lib/scroll-to-section';
import HeaderMobile from '../header/ui/header-mobile';
import { SweeperSecond } from '../main/sweeper-second';

import { Popular } from './el/popular';
import SearchBlock from './el/search-block/search-block';
import { type ICategory } from './types';

import MobileCategories from '@/entities/mobile-categories/mobile-categories';
import Stories from '@/feature/stories/stories';
import { CATEGORIES_SIDEBAR } from '@/global-config';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { handleScroll } from '@/shared/lib/scroll-events';
import { cn } from '@/shared/lib/utils';
import { useActiveCategory } from '@/shared/state/active-category';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import Catalog from '@/widgets/catalog/catalog';
import { SweeperFirst } from '@/widgets/main/sweeper-first';

const WrapperMenu = () => {
  const { activeCategory, setActiveCategory, sectionsListRef, categoriesListRef } =
    useActiveCategory();

  const { ordersCount } = useCart();

  const containerRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);
  const { data } = useGetCatalog();

  const isMobile = useMediaQuery('(max-width:1024px');
  const isDesktop = useMediaQuery('(min-width:1024px');

  const handleScrollEvent = () => {
    setTimeout(() => {
      handleScroll(
        sectionsListRef,
        categoriesListRef,
        activeCategory,
        mobileListRef,
        setActiveCategory,
        isMobile,
      );
    });
  };

  useWindowEventListener('scroll', handleScrollEvent, { passive: true });

  const platesList = data?.categories?.map((category: ICategory) => {
    const items: ICartOrderItem[] = data?.plates?.filter(
      (item: any) => item.categoryID === String(category.id),
    );

    return items.length > 0 ? category : null;
  });

  const filteredListCategories = platesList?.filter((item: ICategory) => item !== null);

  // const filtered = data?.plates
  //   ? Object.values(data?.plates)?.filter(
  //       (el: ICartOrderItem) => el.isHit.toString() === '1',
  //     )
  //   : [];

  useEffect(() => {
    if (sessionStorage.getItem('cat')) {
      scrollToSection(sessionStorage.getItem('cat') ?? '0');
      sessionStorage.removeItem('cat');
    }

    return () => {
      setActiveCategory(0);
    };
  }, []);

  const [burgerIsOpen, setBurgerIsOpen] = useState(false);

  return (
    <div className='flex w-full gap-x-[100px]'>
      {burgerIsOpen && (
        <div className='fixed left-0 top-0 z-[100] h-screen w-[100vw] bg-black/50'></div>
      )}
      {!isMobile && CATEGORIES_SIDEBAR && (
        <div className='w-[303px] min-w-[303px] '>
          <CatalogSidebar
            categories={filteredListCategories}
            activeCategory={activeCategory}
          />
        </div>
      )}
      <main
        ref={containerRef}
        className={cn('mx-auto flex w-full max-w-[1304px] flex-col')}
      >
        <section className='relative w-full'>
          {CATEGORIES_SIDEBAR &&
            (isDesktop ? <Header callback={setBurgerIsOpen} /> : <HeaderMobile />)}
          <SweeperSecond />
          <SweeperFirst />
          <Stories />
          <Popular />
          {/* <Recommendations filtered={filtered} /> */}
          <SearchBlock />
          {isMobile && (
            <MobileCategories
              className='sticky top-[64px] z-10 mt-5 bg-bgMain/80 px-4 py-3 backdrop-blur-md max-lg:mt-0'
              ref={mobileListRef}
              categoriesListRef={categoriesListRef}
              onClick={(categoryId) => {
                scrollToSection(String(categoryId));
              }}
            />
          )}
          <Catalog />
          <div
            className={cn(
              `fixed bottom-[120px] -ml-[120px] max-[1600px]:ml-0 max-[1400px]:ml-10`,
              ordersCount > 0 ? 'max-md:!bottom-[100px]' : 'max-md:!bottom-[50px]',
            )}
          >
            {/* <ScrollToTop /> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default WrapperMenu;
