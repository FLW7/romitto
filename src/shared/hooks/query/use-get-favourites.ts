import { useQuery } from '@tanstack/react-query';

import { getFavourites } from '@/shared/api/get-favourites';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetFavourites = () => {
  return useQuery({
    queryKey: QUERY_KEY.favourites,
    queryFn: async () => await getFavourites(),
  });
};
