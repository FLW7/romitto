import { useQuery } from '@tanstack/react-query';

import { getVacancies } from '@/shared/api/get-vacancies';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetVacancies = () => {
  return useQuery({
    queryKey: QUERY_KEY.vacancies,
    queryFn: async () => await getVacancies(),
  });
};
