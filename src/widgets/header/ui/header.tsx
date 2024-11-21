/* eslint-disable unicorn/no-nested-ternary */
'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Burger } from './burger';
import HeaderFixed from './header-fixed/header-fixed';
import HeaderLocation from './header-location';
import styles from './styles.module.css';
import { UserButton } from './user-button';

import Marker from '@/assets/icons/header/location.svg';
import LogoImage from '@/assets/icons/logo.svg';
import Phone from '@/entities/phone';
import Search from '@/entities/search';
import { cn } from '@/shared/lib/utils';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <React.Fragment>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <div className={`${styles.wrapper} pt-2`}>
          <div className='flex items-center'>
            <div className='flex w-full items-center gap-x-10'>
              <div className={'flex items-center gap-4'}>
                <Link href={'/'} className={`flex items-center`}>
                  <LogoImage className={cn(`h-logoHeader w-logoHeader`)} />
                </Link>
                <div className={`flex w-full items-center justify-between gap-2`}>
                  <Marker width={24} height={24} />
                  <HeaderLocation />
                </div>
              </div>
            </div>
            <Phone className='mr-4 flex items-center text-base font-semibold' />
            <UserButton />
            <Burger />
          </div>
        </div>
      </motion.header>

      <HeaderFixed onClose={toggleSearch} />

      {isSearchOpen && (
        <>
          <Search toggleSearch={toggleSearch} />
        </>
      )}
    </React.Fragment>
  );
};

export default Header;
