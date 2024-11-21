import type { AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

interface IPrimeHill {
  bonuses: string;
  cardLink: string;
  qrCodeLink: string;
}

export const createPrimeHillData = async () => {
  const response: AxiosResponse<IPrimeHill> = await axiosInstance.get(
    'User/CreatePrimehillData.php',
  );

  return response.data;
};
