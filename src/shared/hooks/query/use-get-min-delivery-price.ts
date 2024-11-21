import { useQuery } from '@tanstack/react-query';

import { getMinDeliveryPrice } from '@/shared/api/get-min-delivery-price';
import { QUERY_KEY } from '@/shared/const/query-key';

export const useGetMinDeliveryPrice = (
  polygonID: number,
  organistaionID: number,
  deliveryType: number,
  orderPrice: number,
) => {
  return useQuery({
    queryKey: QUERY_KEY.minDeliveryPrice,
    queryFn: async () =>
      await getMinDeliveryPrice(polygonID, organistaionID, deliveryType, orderPrice),
    enabled: !!polygonID,
  });
};
