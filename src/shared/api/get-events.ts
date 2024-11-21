import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

export interface IEventItem {
  id: string;
  type: string;
  organisationsId: string;
  text: string;
  date: string;
}
export interface IEvents {
  id: string;
  Name: string;
  all: IEventItem[];
  show: IEventItem[];
  master: IEventItem[];
}

export const getEvents = async () => {
  const response: AxiosResponse<IEvents[]> = await axiosInstance.post(
    `/Content/getOrganisationEvent.php`,
  );

  return response.data;
};
