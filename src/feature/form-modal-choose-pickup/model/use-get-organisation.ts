import { useQuery } from '@tanstack/react-query';

import { getOrganisations } from '@/feature/form-modal-choose-pickup/api';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetOrganisation = () => {
  return useQuery({
    queryFn: async () => await getOrganisations(),

    queryKey: QUERY_KEY.organisation,
    select: (data) => data.data,
  });
};
