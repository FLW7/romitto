'use client';

import Link from 'next/link';

import HeartIcon from '@/assets/icons/heart.svg';
import { ROUTES } from '@/shared/const/routes';
import { LkConfig } from '@/widgets/lk/config';

export function AddFavorite() {
  return (
    <Link href={ROUTES.favorite} className={'flex items-center gap-2 text-main'}>
      {LkConfig.favorite}
      <HeartIcon className={'transition-colors'} />
    </Link>
  );
}
