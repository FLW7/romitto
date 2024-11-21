import type { AxiosResponse } from 'axios';

import { type IChooseMyAddressRequest, type IGetMyAddressResponse } from './type';

import axiosInstance from '@/shared/api/core';

export async function getMyAddress() {
  const response: AxiosResponse<IGetMyAddressResponse> = await axiosInstance.get(
    `/User/GetUserAddresses.php`,
  );

  return response.data;
}
export async function deleteMyAddress(id: string) {
  const response: AxiosResponse<IGetMyAddressResponse> = await axiosInstance.post(
    `/User/DeleteUserAddress.php`,
    {
      AddressID: id,
    },
  );

  return response.data;
}
export async function chooseMyAddress(data: IChooseMyAddressRequest) {
  const response: AxiosResponse<IGetMyAddressResponse> = await axiosInstance.post(
    `/User/SaveLastAddress.php`,
    data,
  );

  return response.data;
}
