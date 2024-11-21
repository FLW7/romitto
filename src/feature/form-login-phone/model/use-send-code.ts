import { useMutation } from '@tanstack/react-query';

import { sendCode } from '@/feature/form-login-phone/api';
import { type MutateSendCodeProps } from '@/feature/form-login-phone/type';
import { useToast } from '@/shared/components/use-toast';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';

export const useSendCode = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const { onClose } = useModal();

  return useMutation({
    mutationFn: async (data: MutateSendCodeProps) => await sendCode(data),
    onSuccess: (data) => {
      if (data.error) {
        toast({ title: 'Неверный код', variant: 'destructive' });
      } else {
        login(data);
        onClose();
      }
    },
  });
};
