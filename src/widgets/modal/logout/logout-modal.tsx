'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog';
import { ROUTES } from '@/shared/const/routes';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';

export const LogoutModal = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'logout';

  const logoutHandler = () => {
    logout();
    router.push(ROUTES.home);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'bg-white px-4 py-12 text-black md:px-16 md:py-14'}>
        <DialogHeader className={'mb-7'}>
          <DialogTitle className={'text-center'}>Хотите выйти из профиля?</DialogTitle>
        </DialogHeader>

        <div className={'flex flex-col items-center gap-3 md:flex-row '}>
          <Button className={'w-full md:w-[225px]'} onClick={logoutHandler}>
            Выйти
          </Button>
          <Button className={'w-full md:w-[225px]'} variant={'outline'} onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
