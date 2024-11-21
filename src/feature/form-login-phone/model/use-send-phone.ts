import { useMutation } from '@tanstack/react-query';

import { sendPhone } from '@/feature/form-login-phone/api';
import { getOnlyNumbers } from '@/shared/lib/phone-mask';
import { useModal } from '@/shared/state/modal';
interface Props {
  getValue: (value: string) => string;
}

export interface PropsMutate {
  Phone: string;

  hash: string;
  temp: number;
}
export const useSendPhone = ({ getValue }: Props) => {
  const { onOpen, type } = useModal();

  return useMutation({
    mutationFn: async (data: PropsMutate) => await sendPhone(data),
    onSuccess: (data) => {
      if (data.error === 'account not found') {
        onOpen('register', { phone: getOnlyNumbers(getValue('phone')) });

        return;
      }
      if (type !== 'loginCode') {
        onOpen('loginCode', { phone: getOnlyNumbers(getValue('phone')) });
      }
    },
  });
};
