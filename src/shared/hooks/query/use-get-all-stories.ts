import { useQuery } from '@tanstack/react-query';

import { getAllStories } from '@/shared/api/get-catalog';

export const useGetAllStories = () => {
  return useQuery({
    queryKey: ['useGetAllStories'],
    queryFn: async () => await getAllStories(),
  });
};
