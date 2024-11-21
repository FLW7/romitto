import Link from 'next/link';

import AdApp from '../header-fixed/ad-app';
import HeaderLocation from '../header-location';

import BurgerMenuIcon from '@/assets/icons/burger-menu.svg';
import LkProfileIcon from '@/assets/icons/user-lk.svg';
import ZipIcon from '@/assets/icons/zip-white.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { ROUTES } from '@/shared/const/routes';
import { useGetPrimeHill } from '@/shared/hooks/query/prime-hill';
import { getCookie } from '@/shared/lib/cookies';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';

const HeaderMobile = () => {
  const { data: primeHillData } = useGetPrimeHill();
  const { isAuth } = useAuth();
  const { onOpen: onOpenModal } = useModal();

  return (
    <>
      {getCookie('adApp') !== '0' && <AdApp />}
      <div className='sticky top-0 z-10 flex w-full items-center bg-white px-4 py-[14px] shadow-headerMobile'>
        <div className='flex w-full items-center justify-between gap-10'>
          <div className='flex items-center'>
            <Button
              variant={'destructive'}
              className={'mr-2 h-full p-0'}
              onClick={() => {
                onOpenModal('catalog');
              }}
            >
              <BurgerMenuIcon width={24} height={24} className='rotate-180' />
            </Button>

            <HeaderLocation />
          </div>
          {isAuth ? (
            <Link
              href={ROUTES.lk}
              className='relative flex h-[42px] flex-col items-center'
            >
              <Button variant={'destructive'} className='p-0'>
                <LkProfileIcon className='h-9 w-9' />
              </Button>
              <div className='absolute bottom-0 flex min-w-full items-center justify-center rounded-full bg-main px-2 py-[1px]'>
                <Typography
                  variant='desc'
                  className='!text-[10px] !font-semibold leading-[14px] text-white'
                >
                  {primeHillData?.bonuses ?? 0}
                </Typography>
                <ZipIcon className='h-2 w-2 min-w-2' />
              </div>
            </Link>
          ) : (
            <Button
              variant={'destructive'}
              className='p-0'
              onClick={() => {
                onOpenModal('login');
              }}
            >
              <LkProfileIcon className='h-9 w-9' />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
