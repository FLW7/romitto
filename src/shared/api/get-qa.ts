import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

export const getQA = async () => {
  const response: AxiosResponse = await axiosInstance.get('Content/GetPage.php?Page=QA');

  return response.data;
};
