import { useQuery } from '@tanstack/react-query';

import { getOrders } from '../api';

import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetOrders = () => {
  return useQuery({
    queryFn: async () => await getOrders(),
    queryKey: QUERY_KEY.orders,
    select: (data) => data.orders,
    gcTime: 0,
    staleTime: 0,
  });
};
