import { useQuery } from '@tanstack/react-query';

import { getAllOrganizations } from '../api';

import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetAllOrganizations = () => {
  return useQuery({
    queryFn: async () => await getAllOrganizations(),
    queryKey: QUERY_KEY.allOrganizations,
    select: (data) => data.data,
  });
};
