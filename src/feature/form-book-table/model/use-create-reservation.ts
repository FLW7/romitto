import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createReservation } from '../api';
import { type ICreateReservationRequest } from '../type';

export const useCreateReservation = () => {
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (data: ICreateReservationRequest) => await createReservation(data),
    onSuccess: (data) => {
      push(data.link);
    },
  });
};
