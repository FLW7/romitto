import { useMutation } from '@tanstack/react-query';

import { createPrimeHillData } from '@/shared/api/create-primehill-data';

export const useCreatePrimeHillData = () => {
  return useMutation({
    mutationFn: async () => await createPrimeHillData(),
  });
};
