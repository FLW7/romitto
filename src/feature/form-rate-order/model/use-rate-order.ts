import { useMutation, useQueryClient } from '@tanstack/react-query';

import { rateMyOrder, rateOrder } from '../api';
import { type IRateOrderRequest } from '../type';

import { QUERY_KEY } from '@/shared/const/query-key';
import { useModal } from '@/shared/state/modal';

export const useRateOrder = (id?: string) => {
  const client = useQueryClient();
  const { onClose, onOpen, data } = useModal();

  const isAddRate = data?.type === 'AddRate';

  return useMutation({
    mutationFn: async (data: IRateOrderRequest) =>
      isAddRate ? await rateOrder(data) : await rateMyOrder(data),
    onSuccess: () => {
      void (id && client.refetchQueries({ queryKey: QUERY_KEY.order(id) }));
      id ? onOpen('detailOrder', { id }) : onClose();
    },
  });
};
