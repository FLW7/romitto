'use client';

import Link from 'next/link';

import HeartIcon from '@/assets/icons/heart.svg';
import { MAConfig } from '@/feature/form-my-addresses/config';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { ROUTES } from '@/shared/const/routes';

export function MobAddFavorite() {
  return (
    <Button className={'mx-full mt-12 px-4 md:hidden '}>
      <Link href={ROUTES.favorite} className={'flex gap-2'}>
        <Typography variant={'p2'} className={'text-white'}>
          {MAConfig.btnFavorite}
        </Typography>
        <HeartIcon width={24} height={24} style={{ stroke: 'white' }} />
      </Link>
    </Button>
  );
}
