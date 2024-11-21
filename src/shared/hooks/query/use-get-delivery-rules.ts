import { useQuery } from '@tanstack/react-query';

import { getDeliveryRules } from '@/shared/api/get-delivery-rules';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetDeliveryRules = () => {
  return useQuery({
    queryKey: QUERY_KEY.deliveryRules,
    queryFn: async () => await getDeliveryRules(),
  });
};
