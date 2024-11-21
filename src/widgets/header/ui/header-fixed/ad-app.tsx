'use client';

import { useEffect, useState } from 'react';

import { X } from 'lucide-react';
import Link from 'next/link';

import AdLogoIcon from '@/assets/icons/logo-ad.svg';
import { APP_STORE_LINK, COMPANY_NAME_SHORT, GOOGLE_PLAY_LINK } from '@/global-config';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { setCookie } from '@/shared/lib/cookies';

const AdApp = () => {
  const [closed, setClosed] = useState(false);
  const [os, setOs] = useState<'ios' | 'android' | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
      setOs('android');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setOs('ios');
    }
  }, []);

  return (
    !closed && (
      <div className='flex h-10 w-full items-center bg-addAppBg px-4 py-[6px]'>
        <Button
          variant='destructive'
          className='mr-[14px] aspect-square h-5 w-5 rounded-full bg-white/10 p-[3px]'
          onClick={() => {
            setClosed(true);
            setCookie('adApp', '0', 1);
          }}
        >
          <X size={14} color='white' />
        </Button>
        <div className='flex w-full items-center justify-between'>
          <div className='flex  items-center gap-2'>
            <AdLogoIcon className='h-7 w-7 rounded-sm' />
            <Typography variant='desc' className='!text-xs !font-semibold !text-white'>
              {COMPANY_NAME_SHORT} - доставка еды
            </Typography>
          </div>
          <Link href={os === 'ios' ? APP_STORE_LINK : GOOGLE_PLAY_LINK}>
            <Button className='bg-white px-4 py-1 !text-xs !font-semibold leading-[17px] text-primary'>
              открыть
            </Button>
          </Link>
        </div>
      </div>
    )
  );
};

export default AdApp;
