import { useMutation } from '@tanstack/react-query';

import { chooseMyAddress } from '../api';
import type { IChooseMyAddressRequest } from '../type';

import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';

export const useChooseMyAddress = () => {
  const { step } = useDelivery();
  const { onClose, onOpen } = useModal();

  return useMutation({
    mutationFn: async (data: IChooseMyAddressRequest) => await chooseMyAddress(data),
    onSuccess: async () => {
      onClose();

      step === 'booking' && onOpen('bookTableDatePicker');
    },
  });
};
