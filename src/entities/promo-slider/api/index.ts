import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

export const getBanner = async () => {
  const response: AxiosResponse<any> = await axiosInstance.post('User/GetBanners.php');

  return response.data;
};
