import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type INews } from '@/widgets/promotions/types';

export const getNews = async () => {
  const response: AxiosResponse<INews> = await axiosInstance.post(
    `/Content/GetNews.php`,
    {
      entity_id: 1,
    },
  );

  return response.data;
};
