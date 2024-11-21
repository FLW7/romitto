import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

export const getBonusesProgram = async () => {
  const response: AxiosResponse = await axiosInstance.get(
    'Content/GetPage.php?Page=BonusesProgram',
  );

  return response.data;
};
