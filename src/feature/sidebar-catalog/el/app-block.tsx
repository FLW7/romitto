import Link from 'next/link';

import AppStore from '@/assets/icons-yap/app-store.svg';
import GooglePlay from '@/assets/icons-yap/google-play.svg';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/global-config';
import Typography from '@/shared/components/typography';

export const AppBlock = () => {
  return (
    <>
      <div className={'flex flex-col gap-2'}>
        <Link href={APP_STORE_LINK} className='block w-fit' target='_blank'>
          <AppStore className={'h-[34px] !w-[112px]'} />
        </Link>
        <Link href={GOOGLE_PLAY_LINK} className='block w-fit' target='_blank'>
          <GooglePlay className={'h-[34px] !w-[112px]'} />
        </Link>

        <Typography variant='desc' className='mt-2 text-xs text-secondary'>
          Разработано{' '}
          <Link href={'https://sellkit.cc/'} target='_blank'>
            <span className='underline'>sellkit.cc</span>
          </Link>
        </Typography>
      </div>
    </>
  );
};
