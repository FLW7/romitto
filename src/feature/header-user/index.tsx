import Link from 'next/link';

import UserIcon from '@/assets/icons/user.svg';
import ZipIcon from '@/assets/icons/zip.svg';
import Typography from '@/shared/components/typography';
import { ROUTES } from '@/shared/const/routes';
import { useProfileData } from '@/shared/hooks/use-profile-data';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';

export const HeaderUser = () => {
  const { isAuth } = useAuth();
  const { bonusScore } = useProfileData();
  const { onOpen: onOpenModal } = useModal();

  return (
    <div className={'group flex flex-col items-center gap-2 '}>
      {isAuth ? (
        <Link href={ROUTES.lk}>
          <UserIcon
            className={'block transition-colors group-hover:stroke-main'}
            width={26}
            height={26}
          />
        </Link>
      ) : (
        <button
          onClick={() => {
            onOpenModal('login');
          }}
        >
          <UserIcon
            className={'block transition-colors group-hover:stroke-main'}
            width={26}
            height={26}
          />
        </button>
      )}

      {isAuth && (
        <div className='center transition-colors group-hover:text-main'>
          <Typography variant={'p'}>{bonusScore}</Typography>

          <ZipIcon width={17} height={17} />
        </div>
      )}
    </div>
  );
};
