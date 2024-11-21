import type { AxiosResponse } from 'axios';

import { type ISendContactEmailRequest } from '@/feature/form-callback/type';
import axiosInstance from '@/shared/api/core';

export async function SendContactEmail(data: ISendContactEmailRequest) {
  const response: AxiosResponse<any> = await axiosInstance.post(
    `/Messaging/SendContactEmail.php`,
    data,
  );

  return response.data;
}
