import type { AxiosResponse } from 'axios';

import { type PropsMutate } from '@/feature/form-login-phone/model/use-send-phone';
import {
  type ISendCodeResponse,
  type MutateSendCodeProps,
} from '@/feature/form-login-phone/type';
import axiosInstance from '@/shared/api/core';

export async function sendPhone(data: PropsMutate) {
  const response: AxiosResponse<any> = await axiosInstance.post(
    `/Auth/SendCode_f.php`,
    data,
  );

  return response.data;
}

export async function sendCode(data: MutateSendCodeProps) {
  const response: AxiosResponse<ISendCodeResponse> = await axiosInstance.post(
    `/Auth/Log_f.php`,
    data,
  );

  return response.data;
}
