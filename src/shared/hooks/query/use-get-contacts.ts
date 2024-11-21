import { useQuery } from '@tanstack/react-query';

import { getContacts } from '@/shared/api/get-contacts';

export const useGetContacts = () => {
  return useQuery({
    queryKey: ['useGetContacts'],
    queryFn: async () => await getContacts(),
  });
};
