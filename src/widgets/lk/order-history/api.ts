import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type IOrdersResponse } from '@/widgets/lk/order-history/type';

export async function getOrders() {
  const response: AxiosResponse<IOrdersResponse> = await axiosInstance.get(
    '/Orders/GetOrdersData.php',
  );

  return response.data;
}
