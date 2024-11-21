import { type AxiosResponse } from 'axios';

import axiosInstance from '@/shared/api/core';
export interface IDelivery {
  CountTimeStepsPreorder: string;
  TimeStep: string;
  canOrderFromHere: number;
  isClosed: number;
  canPreorder: number;
  allowedOrderTimeList: IAllowedOrderTimeList;
  orderDateTime: string;
  orderMinPrice: string;
  orderDeliveryTime: string;
  isOnlyForOnlinePayment: string;
  deliveryPriceSteps: Array<{
    minPrice: string;
    deliveryPrice: string;
  }>;
  addGift: 1 | 0;

  orderPaymentTypes: Array<{
    paymentType: string;
    isNeedToChangeCash: '0' | '1';
  }>;
  timeForSelfPickup?: string;
  localOrderSale?: string;
  autoPromocodes: IAutoPromocodes;
}

export interface IAutoPromocodes {
  title: string;
  promocodes: IPromocode[];
}
export interface IPromocode {
  promocode: string;
  description: string;
}

export type IAllowedOrderTimeList = Record<string, [DateOrder]> | object;

export interface DateOrder {
  time: string;
  isNow?: number;
}

export const getMinDeliveryPrice = async (
  polygonID: number,
  organistaionID: number,
  deliveryType: number,
  orderPrice: number,
) => {
  const response: AxiosResponse<IDelivery> = await axiosInstance.get(
    `/Content/GetDeliveryMinPriceFromPolygonID.php`,
    {
      params: {
        PolygonID: polygonID,
        OrganistaionID: organistaionID,
        DeliveryType: deliveryType,
        OrderPrice: orderPrice,
      },
    },
  );

  return response.data;
};
