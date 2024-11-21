import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type IGetDetailOrderResponse } from '@/widgets/lk/detail-order/type';

export async function getDetailOrder(id: string) {
  const response: AxiosResponse<IGetDetailOrderResponse> = await axiosInstance.post(
    `/Orders/GetOrderData.php`,
    { OrderID: id },
  );

  return response.data;
}
