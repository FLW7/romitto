import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';

export const checkPromocode = async ({
  promocode,
  deliveryType,
  OrganisationID,
}: {
  promocode: string;
  deliveryType: string;
  OrganisationID: string;
}) => {
  const response: AxiosResponse<any> = await axiosInstance.post(
    `Cart/CheckPromocode_f.php`,
    {
      Promocode: promocode,
      deliveryType,
      OrganisationID,
    },
  );

  return response.data;
};

export const GetOrderBonusesGetPercent = async () => {
  const response: AxiosResponse<any> = await axiosInstance.get(
    `Cart/GetOrderBonusesGetPercent.php`,
  );

  return response.data;
};
