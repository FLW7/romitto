import { useQuery } from '@tanstack/react-query';

import { getSuggests } from '@/feature/form-add-address/api';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetSuggests = (value?: string) => {
  return useQuery({
    queryFn: async () => await getSuggests(value ?? ''),
    queryKey: QUERY_KEY.suggests(value ?? ''),
    enabled: !!value,
    placeholderData: (data) => data,
  });
};
