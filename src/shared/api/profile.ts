import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type IProfileResponse } from '@/shared/type/profile';

export async function getProfile() {
  const response: AxiosResponse<IProfileResponse> = await axiosInstance.get(
    `/User/GetAccountInfo.php`,
  );

  return response.data;
}
