import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export const getFavourites = async () => {
  const response: AxiosResponse<{ plates: ICartOrderItem[] }> = await axiosInstance.post(
    `/User/GetFavoritePlates.php`,
    { web: true },
  );

  return response.data;
};
