import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMyAddress } from '@/feature/form-modal-choose-my-address/api';
import { QUERY_KEY } from '@/shared/const/query-key';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';

export const useDeleteMyAddress = (deleteId?: string) => {
  const { clearState } = useModal();
  const { setStep } = useDelivery();
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteMyAddress(id),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: QUERY_KEY.myAddress });
      if (deleteId) {
        clearState();
        setStep('delivery');
      }
    },
  });
};
