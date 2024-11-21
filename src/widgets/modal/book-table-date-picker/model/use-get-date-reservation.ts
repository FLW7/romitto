import { useQuery } from '@tanstack/react-query';

import { getReservationsDataOrgID } from '@/widgets/modal/book-table-date-picker/api';
import { deleteFirstKey } from '@/widgets/modal/book-table-date-picker/lib';

export const useGetDateReservation = (orgId: string) => {
  return useQuery({
    queryKey: ['getDateReservation', orgId],
    queryFn: async () => await getReservationsDataOrgID(orgId),
    select: (data) => ({
      ...data,
      allowedOrderTimeList: deleteFirstKey(data.allowedOrderTimeList),
    }),
  });
};
