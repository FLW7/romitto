import type { AxiosResponse } from 'axios';

import {
  type IAddAddressRequest,
  type IGetOrganisationByCoordinatesResponse,
  type IGetPlaceByIDResponse,
  type IGetPlaceByLocResponse,
  type IGetSuggestsResponse,
} from './type';

import axiosInstance from '@/shared/api/core';
import { type ILocation } from '@/shared/type/map';

export async function getSuggests(value: string) {
  const response: AxiosResponse<IGetSuggestsResponse> = await axiosInstance.post(
    `/GoogleAPI/PlaceAutocomplete.php`,
    {
      Input: value,
    },
  );

  return response.data;
}
export async function getPlaceByID(id: string) {
  const response: AxiosResponse<IGetPlaceByIDResponse> = await axiosInstance.post(
    `/GoogleAPI/GetPlaceByID.php`,
    {
      PlaceID: id,
    },
  );

  return response.data;
}
export async function getOrganisationByCoordinates({ lat, lng }: ILocation) {
  const response: AxiosResponse<IGetOrganisationByCoordinatesResponse> =
    await axiosInstance.post(`/User/GetOrganisationByAddress.php`, {
      Lattitude: lat,
      Longitude: lng,
    });

  return response.data;
}
export async function addNewAddress(data: IAddAddressRequest) {
  const response: AxiosResponse<IGetOrganisationByCoordinatesResponse> =
    await axiosInstance.post(`/User/AddUserAddress.php`, data);

  return response.data;
}
export async function getPlaceByLocation(data: ILocation) {
  const response: AxiosResponse<IGetPlaceByLocResponse> = await axiosInstance.post(
    `/GoogleAPI/ReverseGeocoding.php`,
    {
      Lattitude: data.lat,
      Longitude: data.lng,
    },
  );

  return response.data;
}
