// https://shaverno-panel.s2.sellkit.ru/NewApi/Content/getPolygonsOrg.php?organisationId=45
import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

export const getOrgPolygon = async (organisationId: number) => {
  const response: AxiosResponse<{
    string: { color: string; pos: Array<[string, string]> };
  }> = await axiosInstance.post('Content/getPolygonsOrg.php', { organisationId });

  return response.data;
};
