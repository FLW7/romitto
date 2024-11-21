import { useQuery } from '@tanstack/react-query';

import { getBonusesProgram } from '@/shared/api/get-bonuses-program';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetBonusesProgram = () => {
  return useQuery({
    queryKey: QUERY_KEY.bonusesProgram,
    queryFn: async () => await getBonusesProgram(),
  });
};
