import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type INews } from '@/widgets/promotions/types';

export const getPromotions = async () => {
  const response: AxiosResponse<INews> = await axiosInstance.post(
    `/Content/GetNews.php`,
    {
      entity_id: 2,
    },
  );

  return response.data;
};
