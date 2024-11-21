import type { AxiosResponse } from 'axios';

import { type IGetOrganisationsResponse } from './type';

import axiosInstance from '@/shared/api/core';

export async function getOrganisations() {
  const response: AxiosResponse<IGetOrganisationsResponse> = await axiosInstance.get(
    `/Content/GetOrganisations.php`,
  );

  return response.data;
}
