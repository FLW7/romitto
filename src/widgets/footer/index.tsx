'use client';

import { usePathname } from 'next/navigation';

import { CenterLogo } from './el/center-logo';

import useMediaQuery from '@/shared/hooks/use-media-query';
import { MobFixNavigation } from '@/widgets/footer/el/mob-fix-navigation';
import { Navigation } from '@/widgets/footer/el/navigation';

export const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const pathname = usePathname();

  return (
    pathname !== '/cart' && (
      <>
        {isMobile && pathname === '/' && (
          <div className={'sticky bottom-0 z-10 bg-bgSecondary lg:static'}>
            <MobFixNavigation />
          </div>
        )}
        <div
          className={
            'border-primary/10 bg-bgFooter max-lg:px-4 max-lg:py-9 lg:gap-20 lg:border-t'
          }
        >
          <div className='container-xl mx-auto flex w-full items-center justify-between !px-4 max-lg:flex-col lg:py-6'>
            <CenterLogo />
            <div className='flex gap-x-10 max-lg:mt-5 max-lg:w-full max-lg:flex-col'>
              <Navigation />
              {/* <Contacts /> */}
            </div>
          </div>
          {/* <Banks /> */}
        </div>
      </>
    )
  );
};
