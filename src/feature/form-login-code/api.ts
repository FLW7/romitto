import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

export async function sendPhone(phone: string) {
  const response: AxiosResponse<any> = await axiosInstance.post(`/Auth/SendCode_f.php`, {
    Phone: phone,
  });

  return response.data;
}
