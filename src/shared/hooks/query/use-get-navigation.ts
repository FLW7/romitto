import { useQuery } from '@tanstack/react-query';

import { getNavigation } from '@/shared/api/get-navigation';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetNavigation = () => {
  return useQuery({
    queryKey: QUERY_KEY.navigation,
    queryFn: async () => await getNavigation(),
  });
};
