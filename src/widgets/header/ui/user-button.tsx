import { useRouter } from 'next/navigation';

import UserDesktop from '@/assets/icons/header/user-desktop.svg';
import ZipIcon from '@/assets/icons/zip-black.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { ROUTES } from '@/shared/const/routes';
import { useGetPrimeHill } from '@/shared/hooks/query/prime-hill';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';

export const UserButton = () => {
  const { onOpen } = useModal();
  const { isAuth } = useAuth();
  const { data: primeHillData } = useGetPrimeHill();
  const router = useRouter();

  const handleClick = () => {
    isAuth ? router.push(ROUTES.lk) : onOpen('login');
  };

  return (
    <Button
      variant={'destructive'}
      size={'destructive'}
      className='my-3 flex gap-1 rounded-full bg-bgSecondary px-4 py-[7px] shadow-userButtonShadow transition-shadow duration-500 hover:shadow-none active:shadow-userButtonShadow'
      onClick={handleClick}
    >
      <UserDesktop className={'h-[17px] w-[18px]'} />

      <div className='flex items-center'>
        <Typography variant='desc' className='!text-sm !font-semibold !leading-[19.6px]'>
          {isAuth ? primeHillData?.bonuses ?? 0 : 'Войти'}
        </Typography>
        {isAuth && <ZipIcon className={'h-[14px] w-[14px]'} />}
      </div>
    </Button>
  );
};
