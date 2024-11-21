'use client';

import { FormLoginCode } from '@/feature/form-login-code';
import { FormLoginPhone } from '@/feature/form-login-phone';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const Login = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'login';
  const isLoginCode = isOpen && type === 'loginCode';

  if (isMobile) {
    return (
      <Sheet open={isModalOpen || isLoginCode} onOpenChange={onClose}>
        <SheetContent side={'left'}>
          {isModalOpen && <FormLoginPhone />}
          {isLoginCode && <FormLoginCode />}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isModalOpen || isLoginCode} onOpenChange={onClose}>
      <DialogContent
        className={'z-[52] mx-auto max-w-lg bg-bgMain p-0 text-black'}
        classNameOverlay='z-[51]'
      >
        {isModalOpen && <FormLoginPhone />}
        {isLoginCode && <FormLoginCode />}
      </DialogContent>
    </Dialog>
  );
};

export default Login;
