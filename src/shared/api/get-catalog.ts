import { type AxiosResponse } from 'axios';

import axiosInstance from './core';

import {
  type IGetAllStoriesResponse,
  type IGetCatalogResponse,
  type IGetCategoryResponse,
} from '@/shared/type/product';

export const getCatalog = async (orgID: number) => {
  const response: AxiosResponse<IGetCatalogResponse> = await axiosInstance.post(
    'Content/GetCatalog.php',
    { OrganisationID: orgID, web: true },
  );

  return response.data;
};

export const getAllStories = async () => {
  const response: AxiosResponse<IGetAllStoriesResponse> = await axiosInstance.post(
    'User/GetAllStories.php',
  );

  return response.data;
};

export const getCategory = async () => {
  const response: AxiosResponse<IGetCategoryResponse[]> = await axiosInstance.get(
    'Content/GetCatalogForType.php',
    {
      params: { type: 0 },
    },
  );

  return response.data;
};
