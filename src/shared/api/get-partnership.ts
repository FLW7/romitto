import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

interface IPartnership {
  data: [
    {
      id: string;
      descr: string;
      title: string;
    },
  ];
  org: [
    {
      id: string;
      Name: string;
      requisites: string;
      IsHaveLocalOrder: string;
    },
  ];
}

export const getPartnership = async () => {
  const response: AxiosResponse<IPartnership> = await axiosInstance.get(
    'Content/GetPage.php?Page=Partnership',
  );

  return response.data;
};
