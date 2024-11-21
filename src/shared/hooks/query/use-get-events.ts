import { useQuery } from '@tanstack/react-query';

import { getEvents } from '@/shared/api/get-events';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetEvents = () => {
  return useQuery({
    queryKey: QUERY_KEY.events,
    queryFn: async () => await getEvents(),
  });
};
