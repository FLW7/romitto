/* eslint-disable unicorn/no-nested-ternary */
'use client';

import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Burger } from './burger';
import CartButtonDesktop from './header-fixed/cart-button/cart-button-desktop';
import CartButtonMobile from './header-fixed/cart-button/cart-button-mobile';
import HeaderFixed from './header-fixed/header-fixed';
import HeaderLocation from './header-location';
import styles from './styles.module.css';
import { UserButton } from './user-button';

import Marker from '@/assets/icons/header/location.svg';
import LogoImage from '@/assets/icons/logo.svg';
import SearchIcon from '@/entities/header-assets/search-icon/ui/search-icon';
import Phone from '@/entities/phone';
import Search from '@/entities/search';
import { CATEGORIES_SIDEBAR } from '@/global-config';
import Typography from '@/shared/components/typography';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { useGetContacts } from '@/shared/hooks/query/use-get-contacts';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { getOnlyNumbers } from '@/shared/lib/phone-mask';
import { cn } from '@/shared/lib/utils';
import { useAddress } from '@/shared/state/address';

const Header: React.FC<{ callback?: Dispatch<SetStateAction<boolean>> }> = ({
  callback,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { address } = useAddress();
  const { data: contacts } = useGetContacts();
  const { data: catalog } = useGetCatalog();
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const isTablet = useMediaQuery('(max-width:1460px)');
  const isDesktop = useMediaQuery('(min-width:1460px)');

  return (
    <React.Fragment>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className={cn(
          styles.header,
          CATEGORIES_SIDEBAR &&
            'fixed top-0 z-[10] bg-bgMain/90 px-4 pb-2 pl-5 backdrop-blur-[3px] lg:sticky',
        )}
      >
        <div className={`${styles.wrapper} pt-2`}>
          <div className='flex items-center'>
            <div className='flex w-full items-center gap-x-10'>
              <div className={'flex items-center gap-4'}>
                {!CATEGORIES_SIDEBAR && (
                  <Link href={'/'} className={`flex items-center`}>
                    <LogoImage className={cn(`h-logoHeader w-logoHeader`)} />
                  </Link>
                )}
                <div className={`flex w-full items-center justify-between gap-2`}>
                  <Marker width={24} height={24} />
                  <HeaderLocation />
                </div>
              </div>
            </div>

            <div
              className={cn(
                CATEGORIES_SIDEBAR && 'gap-[26px]',
                'flex items-center gap-4',
              )}
            >
              {catalog && CATEGORIES_SIDEBAR ? (
                <div
                  onClick={toggleSearch}
                  className='flex cursor-pointer items-center gap-2'
                >
                  <SearchIcon className={'h-6 w-6'} />
                  <Typography variant='desc' className='text-sm font-semibold'>
                    Найти
                  </Typography>
                </div>
              ) : address?.LastAddressOrgID ? (
                <Phone className='mr-4 flex items-center text-base font-semibold' />
              ) : (
                <div>
                  {contacts?.contacts.map((item, key) => (
                    <Link key={key} href={`tel:${getOnlyNumbers(item.data)}`}>
                      <Typography
                        variant='desc'
                        className={cn('whitespace-nowrap text-primary')}
                      >
                        {item.data}
                      </Typography>
                    </Link>
                  ))}
                </div>
              )}
              <UserButton />
              {CATEGORIES_SIDEBAR && isDesktop && <CartButtonDesktop />}
              {CATEGORIES_SIDEBAR && isTablet && <CartButtonMobile />}
            </div>
            <Burger callback={callback} />
          </div>
        </div>
      </motion.header>

      {!CATEGORIES_SIDEBAR && <HeaderFixed onClose={toggleSearch} />}

      {isSearchOpen && (
        <>
          <Search toggleSearch={toggleSearch} />
        </>
      )}
    </React.Fragment>
  );
};

export default Header;
