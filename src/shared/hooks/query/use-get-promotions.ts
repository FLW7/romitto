import { useQuery } from '@tanstack/react-query';

import { getPromotions } from '@/shared/api/get-promotions';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetPromotion = () => {
  return useQuery({
    queryKey: QUERY_KEY.promotions,
    queryFn: async () => await getPromotions(),
  });
};
