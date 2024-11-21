import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export enum FavouriteType {
  delete,
  add,
}

interface ISetFavouriteArgs {
  type: 'add' | 'delete';
  id: number;
}

export const setFavourite = async ({ id, type }: ISetFavouriteArgs) => {
  const stateValue = FavouriteType[type];
  const response: AxiosResponse<{ plates: ICartOrderItem[] }> = await axiosInstance.post(
    `/User/SetFavoritePlate.php`,
    { PlateID: id, State: stateValue },
  );

  return response.data;
};
