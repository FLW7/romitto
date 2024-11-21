import { useQuery } from '@tanstack/react-query';

import { getNews } from '@/shared/api/get-news';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetNews = () => {
  return useQuery({
    queryKey: QUERY_KEY.news,
    queryFn: async () => await getNews(),
  });
};
