import axios, { type AxiosError } from 'axios';

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

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.code || response?.data?.message === 'Аккаунт не найден') {
      removeCookie('token');
      useAuth.getState().logout();
      window.location.reload();
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosError['config'] & {
      _isRetry: boolean;
    };

    if (error.response?.status === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      const refreshToken = getCookie('refreshToken');

      if (refreshToken) {
        try {
          const response = await fetch(`${API.base}/token/refresh/`, {
            body: JSON.stringify({
              refresh: refreshToken,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          const { access } = await response.json();

          useAuth.getState().login({ token: access });
        } catch {
          // useAuth.getState().logout();
          console.log(error);
        }
      } else {
        // useAuth.getState().logout();
      }
    } else {
      if (error.message !== 'canceled') {
        // toast.error(error.message);
      }
    }

    throw error;
  },
);

export default axiosInstance;
