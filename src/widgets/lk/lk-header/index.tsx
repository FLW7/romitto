'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './styles.module.css';

import { AddFavorite } from '@/feature/lk-add-favorite';
import { LkLogoutIcon } from '@/feature/lk-logout';
import Typography from '@/shared/components/typography';
import { LkConfig } from '@/widgets/lk/config';
export function LkHeader() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <Typography variant={'h1'} className={'hidden md:block'}>
        {LkConfig.title}
      </Typography>

      <div className='flex items-center gap-3 md:hidden'>
        <ChevronLeft
          size={24}
          className='stroke-primary'
          onClick={() => {
            router.push('/');
          }}
        />
        <Typography variant={'h1'}>{LkConfig.mobTitle}</Typography>
      </div>

      <div className={'hidden md:block'}>
        <AddFavorite />
      </div>

      <div className={'md:hidden'}>
        <LkLogoutIcon />
      </div>
    </div>
  );
}
