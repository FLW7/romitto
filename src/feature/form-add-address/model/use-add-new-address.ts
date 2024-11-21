import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addNewAddress } from '@/feature/form-add-address/api';
import { type IAddAddressRequest } from '@/feature/form-add-address/type';
import { QUERY_KEY } from '@/shared/const/query-key';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';
interface Props {
  deleteId?: string;
  handleDelete?: (id: string) => void;
}
export const useAddNewAddress = ({ deleteId, handleDelete }: Props) => {
  const { onClose } = useModal();
  const client = useQueryClient();
  const { setStep } = useDelivery();

  return useMutation({
    mutationFn: async (data: IAddAddressRequest) => await addNewAddress(data),
    onSuccess: async () => {
      await client.refetchQueries({ queryKey: QUERY_KEY.myAddress });
      deleteId && handleDelete && handleDelete(deleteId);
      !deleteId && setStep('delivery');

      onClose();
    },
  });
};
