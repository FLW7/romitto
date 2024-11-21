import type { AxiosResponse } from 'axios';

import { type IGetAllOrganizationsResponse } from './type';

import axiosInstance from '@/shared/api/core';

export async function getAllOrganizations() {
  const response: AxiosResponse<IGetAllOrganizationsResponse> = await axiosInstance.get(
    `/Content/GetOrganisations.php`,
  );

  return response.data;
}
