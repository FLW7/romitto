import { useQuery } from '@tanstack/react-query';

import { getShipingAndPayment } from '@/shared/api/get-shiping-and-payment';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetShiping = () => {
  return useQuery({
    queryKey: QUERY_KEY.shiping,
    queryFn: async () => await getShipingAndPayment(),
  });
};
