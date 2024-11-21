import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

export const getSiteAccessibility = async () => {
  const response: AxiosResponse = await axiosInstance.get(
    'Content/SiteAccessibility.php',
  );

  return response.data;
};
