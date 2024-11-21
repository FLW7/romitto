import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type INavigateResponse } from '@/shared/type/navigate';

export const getNavigation = async () => {
  const response: AxiosResponse<INavigateResponse> = await axiosInstance.get(
    'Content/GetPage.php?Page=Navigation',
  );

  return response.data;
};
