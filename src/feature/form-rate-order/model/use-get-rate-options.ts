import { useQuery } from '@tanstack/react-query';

import { getRateOptions } from '../api';

export const useGetRateOptions = () => {
  return useQuery({
    queryFn: async () => await getRateOptions(),
    queryKey: ['getRateOptions'],
  });
};
