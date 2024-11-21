import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

export const getShipingAndPayment = async () => {
  const response: AxiosResponse = await axiosInstance.get(
    'Content/GetPage.php?Page=ShippingAndPayment',
  );

  return response.data;
};
