import { useQuery } from '@tanstack/react-query';

import { getOrgPolygon } from '@/shared/api/get-org-polygon';

export const useGetOrgPolygon = (orgID: number) => {
  return useQuery({
    queryKey: ['useGetOrgPolygon'],
    queryFn: async () => await getOrgPolygon(orgID),
  });
};
