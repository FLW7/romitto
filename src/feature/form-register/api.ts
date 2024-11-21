import type { AxiosResponse } from 'axios';

import { type ICreateAccountRequest } from './type';

import axiosInstance from '@/shared/api/core';

export async function createAccount(data: ICreateAccountRequest) {
  const response: AxiosResponse<any> = await axiosInstance.post(
    `/Auth/CreateAccount.php`,
    data,
  );

  return response.data;
}
