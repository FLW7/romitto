import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

export async function orderSendCode({
  hashValue,
  temp,
  clearNumbers,
}: {
  hashValue: string;
  temp: number;
  clearNumbers?: string;
}) {
  const response: AxiosResponse = await axiosInstance.post(`Orders/sendCodeOrder.php`, {
    Phone: '+' + clearNumbers,
    hash: hashValue,
    temp,
  });

  return response.data;
}
