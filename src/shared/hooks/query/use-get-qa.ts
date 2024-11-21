import { useQuery } from '@tanstack/react-query';

import { getQA } from '@/shared/api/get-qa';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetQA = () => {
  return useQuery({
    queryKey: QUERY_KEY.QA,
    queryFn: async () => await getQA(),
  });
};
