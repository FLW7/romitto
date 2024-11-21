import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

export async function getPrimeHill() {
  const response: AxiosResponse<{
    bonusLevel: number;
    bonusLevelTitle: string;
    bonuses: number;
    coefficient: string;
    qrCodeLink: string;
    qrCodeText: string;
    totalOrderPrice: number;
  }> = await axiosInstance.get(`/User/CreatePrimehillData.php`);

  return response.data;
}
