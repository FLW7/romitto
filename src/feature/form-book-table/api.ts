import type { AxiosResponse } from 'axios';

import { type ICreateReservationRequest, type ICreateReservationResponse } from './type';

import axiosInstance from '@/shared/api/core';
import { API } from '@/shared/const/api';

export async function createReservation(data: ICreateReservationRequest) {
  const response: AxiosResponse<ICreateReservationResponse> = await axiosInstance.post(
    `/Reservations/CreateReservation.php`,
    data,
    {
      baseURL: API.baseCore,
      headers: {
        Authorization: 'guest_token',
      },
    },
  );

  return response.data;
}
