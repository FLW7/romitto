import { useMutation } from '@tanstack/react-query';

import { SendContactEmail } from '../api';
import { type ISendContactEmailRequest } from '../type';

import { useModal } from '@/shared/state/modal';

export const useSendContactEmail = () => {
  const { onClose } = useModal();

  return useMutation({
    mutationFn: async (data: ISendContactEmailRequest) => await SendContactEmail(data),
    onSuccess: () => {
      onClose();
    },
  });
};
