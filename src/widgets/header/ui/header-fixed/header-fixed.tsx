/* eslint-disable unicorn/no-nested-ternary */
import { useEffect, useRef, useState, type FC } from 'react';

import Link from 'next/link';

import styles from '../styles.module.css';

import CartButtonDesktop from './cart-button/cart-button-desktop';
import CartButtonMobile from './cart-button/cart-button-mobile';
import CategoriesList from './categories-list';

import SearchIcon from '@/assets/icons/header/search.svg';
import LogoIcon from '@/assets/icons/logo-dark.svg';
import Typography from '@/shared/components/typography';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/utils';

interface HeaderFixedProps {
  isCloseSearch?: boolean;
  onClose?: () => void;
}

const HeaderFixed: FC<HeaderFixedProps> = ({ isCloseSearch = false, onClose }) => {
  const [isFixed, setIsFixed] = useState(false);

  const refThreshold = useRef<number>(0);
  const { data: catalog } = useGetCatalog();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > refThreshold.current) {
        !isFixed && setIsFixed(true);
      } else {
        isFixed && setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]);

  const isTablet = useMediaQuery('(max-width:1460px)');

  return (
    <div className={`${styles.header_sticky_backdrop}`}>
      <div
        className={`${styles.sticky_container} !mx-auto max-w-[1304px]  items-center justify-center`}
      >
        <div className={`w-full ${styles.flex_between_center_wrapper}`}>
          <div
            className={cn(
              'flex max-w-[calc(100%-222px)] items-center gap-[1px] !duration-500',
              isFixed && 'gap-4',
            )}
          >
            <div className='min-w-fit overflow-hidden'>
              <Link
                href={'/'}
                className={cn(
                  `flex items-center transition-all !duration-500 ease-in-out`,
                  isFixed
                    ? `!w-logoHeaderFixed translate-x-0 opacity-100`
                    : '!w-[1px] translate-x-[-100%] opacity-0',
                )}
              >
                <LogoIcon className={cn(`h-logoHeaderFixed w-logoHeaderFixed`)} />
              </Link>
            </div>

            <CategoriesList isCloseSearch={isCloseSearch} onClose={onClose} />
          </div>

          {catalog && (
            <div className='relative flex items-center gap-5 py-2'>
              <div onClick={onClose} className='flex cursor-pointer items-center gap-2'>
                <SearchIcon className={'h-6 w-6'} />
                <Typography variant='desc' className='text-sm font-semibold'>
                  Найти
                </Typography>
              </div>
              {isTablet ? <CartButtonMobile /> : <CartButtonDesktop />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderFixed;
