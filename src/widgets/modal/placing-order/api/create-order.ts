import { type AxiosResponse } from 'axios';

import { type IGetMyAddressItem } from '@/feature/form-modal-choose-my-address/type';
import axiosInstance from '@/shared/api/core';

export interface IOrderItemNew {
  id: number;
  countInCart?: number;
  comment?: string;
  modifiers?: Array<{ id: number; items: number[]; counts?: number[] }>;
}

type GroupedOrders = Record<string, IOrderItemNew[]>;

export interface ICreateOrderArgs {
  Lattitude: string | null;
  Longitude: string | null;
  Country: string | null;
  City: string | null;
  Street: string | null;
  IsPrivateHouse: string | null;
  HouseNumber: string | null;
  Apt: string | null;
  Entreance: string | null;
  Floor: string | null;
  DoorNumber: string | null;
  Commentory: string | null;
  PolygonID: string | null;
  OrganisationID: string | null;

  Phone: string;
  Name: string;
  Email: string;
  Comment: string;
  Address: string;
  Promocode?: string;
  Points: number | null;
  Cutlery: Array<{ id: number; count: number }>;
  Additions: Array<{ id: number; count: number }>;
  Gift: number[];
  //   Modifiers: 'Добавить 4 сыра\n добавить напитки';
  Basket: GroupedOrders;
  // {
  //   id: [{ id: number; count: number; modificators?: [{ id: string; items: string[] }] }]
  //   id: [
  //     { id: number; count: number; modificators?: [{ id: string; items: string[] }] },
  //     { id: number; count: number; modificators?: [{ id: string; items: string[] }] },
  //   ];
  // }
  PayType: '0' | '1' | '2';
  CountCashChange: string;
  OrderDateTime: string;
  Code: string | undefined;
  PromocodeData: string;
}

export const createOrder = async (data: ICreateOrderArgs) => {
  const response: AxiosResponse<any> = await axiosInstance.post(
    `Orders/CreateOrder_f.php`,
    { ...data },
  );

  return response.data;
};

export const getAddress = async (id: number) => {
  const response: AxiosResponse<{ data: IGetMyAddressItem }> = await axiosInstance.post(
    `/User/GetUserAddresses.php`,
    {
      address_id: id,
    },
  );

  return response.data;
};

export const getOrganisation = async (id: number) => {
  const response: AxiosResponse<{ data: IGetMyAddressItem }> = await axiosInstance.post(
    `/Content/GetOrganisations.php`,
    {
      organisation_id: id,
    },
  );

  return response.data;
};
