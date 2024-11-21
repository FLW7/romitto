import axios from 'axios';

import { API } from '@/shared/const/api';
import { getCookie, removeCookie } from '@/shared/lib/cookies';
import { useAuth } from '@/shared/state/auth';

const axiosInstance = axios.create({
  baseURL: API.base,
  timeout: API.timeout,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('token');

  // eslint-disable-next-line unicorn/prefer-ternary
  if (!config.headers.Authorization && token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${token}`;
  } else {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `guest_token`;
  }

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (response?.data?.code || response?.data?.message === 'Аккаунт не найден') {
    removeCookie('token');
    useAuth.getState().logout();
    window.location.reload();
  }

  return response;
});

export default axiosInstance;
