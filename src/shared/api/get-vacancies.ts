import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

interface IVacancy {
  id: number;
  descr: string;
  title: string;
}

export const getVacancies = async () => {
  const response: AxiosResponse<{ data: IVacancy[] }> = await axiosInstance.get(
    'Content/GetPage.php?Page=Vacancies',
  );

  return response.data;
};
