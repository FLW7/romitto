import { useQuery } from '@tanstack/react-query';

import { getMyAddress } from '@/feature/form-modal-choose-my-address/api';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetMyAddress = () => {
  return useQuery({
    queryFn: async () => await getMyAddress(),
    queryKey: QUERY_KEY.myAddress,
    select: (data) => data.data,
  });
};
