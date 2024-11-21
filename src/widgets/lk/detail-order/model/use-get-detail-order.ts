import { useQuery } from '@tanstack/react-query';

import { getDetailOrder } from '../api';

import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetDetailOrder = (id?: string) => {
  return useQuery({
    queryFn: async () => await getDetailOrder(id ?? ''),
    queryKey: QUERY_KEY.order(id ?? ''),
    enabled: !!id,
  });
};
