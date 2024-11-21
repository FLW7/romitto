import type { AxiosResponse } from 'axios';

import {
  type IGetRateOptions,
  type IRateOrderRequest,
} from '@/feature/form-rate-order/type';
import axiosInstance from '@/shared/api/core';

export async function rateOrder(data: IRateOrderRequest) {
  const response: AxiosResponse<any> = await axiosInstance.post(
    `/User/AddRate.php`,
    data,
  );

  return response.data;
}

export async function rateMyOrder(data: IRateOrderRequest) {
  const response: AxiosResponse<any> = await axiosInstance.post(
    `/Orders/RateOrder.php`,
    data,
  );

  return response.data;
}
export async function getRateOptions() {
  const response: AxiosResponse<IGetRateOptions[]> = await axiosInstance.get(
    `Content/GetRateOptions.php`,
  );

  return response.data;
}
