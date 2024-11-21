'use client';

import { useEffect, useState } from 'react';

import { calculateValues } from '../cart-sum/lib/calculate-value';

import styles from './style.module.css';

import { Slider } from '@/shared/components/slider';
import Typography from '@/shared/components/typography';
import { useGetPrimeHill } from '@/shared/hooks/query/prime-hill';
import { useGetMinDeliveryPrice } from '@/shared/hooks/query/use-get-min-delivery-price';
import { useAddress } from '@/shared/state/address';
import { useCart } from '@/widgets/cart-widget/state';

const CartPoints: React.FC = () => {
  const {
    decreaseBonus,
    setDecreaseBonus,
    orderSum,
    bonusPercentMax,
    bonusPaymentMax,
    PromocodeType,
    SalePrice,
    SalePercent,
    PromoPlateId,
    PromoCategoryId,
    orders,
    promocode,
  } = useCart();
  const { data: primeHillData } = useGetPrimeHill();
  const [maxValue, setMaxValue] = useState(0);
  const { address } = useAddress();

  const handleChangeValue = (value: number[]) => {
    setDecreaseBonus(value[0] * bonusPercentMax);
  };

  const { data: delivery } = useGetMinDeliveryPrice(
    Number(address.LastPolygonID),
    Number(address.LastAddressOrgID),
    Number(address.LastAddressType),
    Number(orderSum),
  );

  const [orderPrice, setOrderPrice] = useState(0);

  useEffect(() => {
    const { summary } = calculateValues(
      PromocodeType,
      SalePrice,
      SalePercent,
      orderSum,
      delivery?.localOrderSale,
      PromoPlateId,
      PromoCategoryId,
      orders,
    );

    setOrderPrice(Number(summary));
  }, [
    PromocodeType,
    SalePrice,
    SalePercent,
    orderSum,
    delivery?.localOrderSale,
    PromoPlateId,
    PromoCategoryId,
    orders,
  ]);

  useEffect(() => {
    if (
      Number(primeHillData?.bonuses ?? 0) < bonusPaymentMax &&
      Number(primeHillData?.bonuses ?? 0) < orderPrice * bonusPercentMax
    ) {
      setMaxValue(Number(primeHillData?.bonuses ?? 0));
    } else {
      setMaxValue(
        Number(Math.min(bonusPaymentMax, orderPrice * bonusPercentMax).toFixed(0)),
      );
    }

    setDecreaseBonus(0);
  }, [orderPrice, primeHillData?.bonuses, bonusPaymentMax, bonusPercentMax]);

  return (
    Number(primeHillData?.bonuses ?? 0) > 0 &&
    maxValue > 0 &&
    !promocode && (
      <div className='w-[100%]'>
        <div className='flex items-center justify-between'>
          <Typography variant='p' className='text-base font-semibold max-md:text-sm'>
            Потратить {Number(decreaseBonus / bonusPercentMax).toFixed(0)} баллов
          </Typography>
          <Typography
            variant='p'
            className='text-sm font-medium text-secondary max-md:text-xs'
          >
            Максимум {maxValue}
          </Typography>
        </div>
        <Slider
          className='mt-[16px] h-[32px]'
          defaultValue={[Number(Number(decreaseBonus / bonusPercentMax).toFixed(0))]}
          value={[Number(Number(decreaseBonus / bonusPercentMax).toFixed(0))]}
          max={maxValue}
          onValueChange={handleChangeValue}
          classNameTrack='bg-lightGray'
          classNameRange='bg-main'
          classNameThumb={styles.sliderThumb}
        />
      </div>
    )
  );
};

export default CartPoints;
