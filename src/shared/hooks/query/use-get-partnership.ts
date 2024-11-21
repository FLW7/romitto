import { useQuery } from '@tanstack/react-query';

import { getPartnership } from '@/shared/api/get-partnership';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetPartnership = () => {
  return useQuery({
    queryKey: QUERY_KEY.partnership,
    queryFn: async () => await getPartnership(),
  });
};
