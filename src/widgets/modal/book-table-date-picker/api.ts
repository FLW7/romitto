import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type GetReservationsDataOrgIDResponse } from '@/widgets/modal/book-table-date-picker/type';

export const getReservationsDataOrgID = async (orgId: string) => {
  const response: AxiosResponse<GetReservationsDataOrgIDResponse> =
    await axiosInstance.get(`Reservations/GetDataOrgID.php?orgID=${orgId}`);

  return response.data;
};
