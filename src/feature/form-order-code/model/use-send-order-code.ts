import { useMutation } from '@tanstack/react-query';

import { orderSendCode } from '@/shared/api/order-send-code';

export const useSendOrderCode = () => {
  return useMutation({
    mutationFn: async ({
      hashValue,
      temp,
      clearNumbers,
    }: {
      hashValue: string;
      temp: number;
      clearNumbers?: string;
    }) => await orderSendCode({ hashValue, temp, clearNumbers }),
    onSuccess: (data) => {
      // console.log(data);
    },
  });
};
