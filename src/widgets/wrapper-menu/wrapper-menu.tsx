import { useRef, useEffect } from 'react';

import { useWindowEventListener } from 'rooks';

import { useCart } from '../cart-widget/state';
import { scrollToSection } from '../header/lib/scroll-to-section';
import { SweeperSecond } from '../main/sweeper-second';

import { Popular } from './el/popular';
import Recommendations from './el/recommendations';
import SearchBlock from './el/search-block/search-block';

import MobileCategories from '@/entities/mobile-categories/mobile-categories';
import ScrollToTop from '@/feature/scrool-to-top/ui/scroll-to-top';
import Stories from '@/feature/stories/stories';
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

  const filtered = data?.plates
    ? Object.values(data?.plates)?.filter(
        (el: ICartOrderItem) => el.isHit.toString() === '1',
      )
    : [];

  useEffect(() => {
    if (sessionStorage.getItem('cat')) {
      scrollToSection(sessionStorage.getItem('cat') ?? '0');
      sessionStorage.removeItem('cat');
    }

    return () => {
      setActiveCategory(0);
    };
  }, []);

  return (
    <main ref={containerRef} className='flex flex-col gap-x-[50px]'>
      <section className='relative mx-auto w-full max-w-[1304px]'>
        <SweeperSecond />
        <SweeperFirst />
        <Stories />
        <Popular />
        <Recommendations filtered={filtered} />
        <SearchBlock />
        {isMobile && (
          <MobileCategories
            className='sticky top-[64px] z-10 mt-5 bg-white/80 px-4 py-3 backdrop-blur-md max-lg:mt-0'
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
          <ScrollToTop />
        </div>
      </section>
    </main>
  );
};

export default WrapperMenu;
