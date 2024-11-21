import useMediaQuery from '@/shared/hooks/use-media-query';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { type StepFormType } from '@/shared/state/delivery';

export const useGetParamAddress = () => {
  const { isAuth } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { address } = useAddress();

  const getType = () => {
    if (!address?.LastAddressType) return ' Доставка или самовывоз';

    return address?.LastAddressType === 2 ? 'Самовывоз' : 'Доставка';
  };

  const getStep = (): StepFormType => {
    if (!address?.LastAddressType) return 'pickup';

    if (isAuth) {
      return address?.LastAddressType === 2 ? 'pickup' : 'delivery';
    }

    return address?.LastAddressType === 2 ? 'pickup' : 'addAddress';
  };

  const getAddress = () => {
    if (!address?.LastAddressName) {
      return isMobile ? 'Укажите адрес' : 'Укажите адрес доставки или ресторана';
    }

    return address?.LastAddressName;
  };

  return {
    type: getType(),
    step: getStep(),
    address: getAddress(),
  };
};
