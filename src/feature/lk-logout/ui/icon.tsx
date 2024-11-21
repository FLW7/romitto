'use client';

import LogoutIcon from '@/assets/icons/logout.svg';
import { useLogout } from '@/feature/lk-logout/model/use-logout';

export function LkLogoutIcon() {
  const { handleLogout } = useLogout();

  return (
    <button type={'button'} className={'pl-6'} onClick={handleLogout}>
      <LogoutIcon width={24} height={24} />
    </button>
  );
}
