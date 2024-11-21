import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
import { type ISiteAccessibility } from '@/shared/type/site-accessibility-en';
interface Props {
  code?: string;
}
export const getSiteAccessibility = async ({ code }: Props) => {
  const response: AxiosResponse<ISiteAccessibility> = await axiosInstance.get(
    'Content/SiteAccessibility.php?Code=' + code,
  );

  return response.data;
};
