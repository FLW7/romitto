/* eslint-disable unicorn/no-nested-ternary */
import { useEffect } from 'react';

import { ChevronDown } from 'lucide-react';

import Typography from '@/shared/components/typography';
import { useGetMinDeliveryPrice } from '@/shared/hooks/query/use-get-min-delivery-price';
import { useGetParamAddress } from '@/shared/hooks/use-get-param-address';
import { priceFormatter } from '@/shared/lib/price';
import { useAddress } from '@/shared/state/address';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';

const HeaderLocation = () => {
  const { address } = useAddress();
  const { setStep } = useDelivery();
  const { step } = useGetParamAddress();
  const { onOpen: onOpenModal } = useModal();
  const { orderSum, setDeliveryPrice, deliveryPrice } = useCart();
  const { data: delivery, refetch } = useGetMinDeliveryPrice(
    Number(address.LastPolygonID),
    Number(address.LastAddressOrgID),
    Number(address.LastAddressType),
    Number(orderSum),
  );

  useEffect(() => {
    console.log(delivery);

    void refetch();
  }, [address]);

  const handleClick = () => {
    setStep(step);
    onOpenModal('choosingMyLocation');
  };

  useEffect(() => {
    if (delivery?.deliveryPriceSteps?.length && Number(address?.LastAddressType) === 1) {
      for (let i = 0; i < delivery.deliveryPriceSteps.length; i++) {
        const step = delivery.deliveryPriceSteps[i];
        const nextStep = delivery.deliveryPriceSteps[i + 1];

        if (nextStep) {
          if (orderSum < Number(nextStep.minPrice)) {
            setDeliveryPrice(Number.parseInt(step.deliveryPrice));
            break;
          }
        } else {
          setDeliveryPrice(Number.parseInt(step.deliveryPrice));
          break;
        }
      }
    } else {
      setDeliveryPrice(0);
    }
  }, [orderSum, delivery, address?.LastAddressType]);

  return (
    <div
      className='flex cursor-pointer items-center gap-2 lg:gap-1'
      onClick={handleClick}
    >
      <div className='flex flex-col'>
        <div className='flex max-w-fit items-center gap-2'>
          <Typography
            variant={'desc'}
            className='line-clamp-1 max-w-fit overflow-hidden text-ellipsis !text-sm !font-semibold'
          >
            {address.LastAddressName ?? 'Адрес доставки или самовывоз'}
          </Typography>
          <ChevronDown size={14} className='inline' />
        </div>
        <div className='flex gap-[5px]'>
          <Typography variant='desc' className='w-fit !text-xs text-secondary'>
            {address.LastAddressName
              ? address?.LastAddressType === 1
                ? deliveryPrice > 0
                  ? `Доставка ${priceFormatter(deliveryPrice)}`
                  : 'Бесплатная доставка'
                : 'Самовывоз'
              : 'Выберете, где получить заказ'}
          </Typography>
          {(Number(delivery?.orderDeliveryTime) ?? 0) > 0 && (
            <Typography variant='desc' className='!text-xs !text-main'>
              {`~ ${delivery?.orderDeliveryTime} мин`}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderLocation;
