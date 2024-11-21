import { useQuery } from '@tanstack/react-query';

import { getPrimeHill } from '@/shared/api/prime-hill';
import { QUERY_KEY } from '@/shared/const/query-key';
import { getCookie } from '@/shared/lib/cookies';

export const useGetPrimeHill = () => {
  const token = getCookie('token');

  const data = useQuery({
    enabled: !!token,
    queryKey: QUERY_KEY.primehill(token ?? ''),
    queryFn: async () => await getPrimeHill(),
  });

  return data;
};
