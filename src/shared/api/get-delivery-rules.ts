import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

export const getDeliveryRules = async () => {
  const response: AxiosResponse<{ data: { html: string } }> = await axiosInstance.post(
    `/Content/GetPage.php?Page=DeliveryRules`,
  );

  return response.data;
};
