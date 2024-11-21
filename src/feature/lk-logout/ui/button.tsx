'use client';

import { useLogout } from '@/feature/lk-logout/model/use-logout';
import { Button } from '@/shared/components/button';

export function LogoutButton() {
  const { handleLogout } = useLogout();

  return (
    <Button
      type={'button'}
      className={'ml-auto mt-auto hidden px-14 md:block'}
      variant={'outline'}
      onClick={handleLogout}
    >
      Выйти
    </Button>
  );
}
