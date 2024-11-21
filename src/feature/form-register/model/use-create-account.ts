import { useMutation } from '@tanstack/react-query';

import { createAccount } from '../api';
import { type ICreateAccountRequest } from '../type';

import { useModal } from '@/shared/state/modal';
interface Props {
  phone: string;
}
export const useCreateAccount = ({ phone }: Props) => {
  const { onOpen } = useModal();

  return useMutation({
    mutationFn: async (data: ICreateAccountRequest) => await createAccount(data),
    onSuccess: () => {
      onOpen('loginCode', { phone, isRegister: true });
    },
  });
};
