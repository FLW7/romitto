import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

export interface IContactsItem {
  type: string;
  data: string;
  additionalData: string;
}
export interface IContacts {
  bonuses: string;
  contacts: IContactsItem[];
  deliveryAndPayment: string;
  privacyPolicy: string;
  bonusesInfo: string;
}

export const getContacts = async () => {
  const response: AxiosResponse<IContacts> = await axiosInstance.post(
    `User/GetUserInfoAndContacts.php`,
  );

  return response.data;
};
