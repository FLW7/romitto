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
    promoIsCombined,
    promos,
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
    if (promoIsCombined === '0') {
      const { summary } = calculateValues(
        PromocodeType,
        SalePrice,
        SalePercent,
        orderSum,
        delivery?.localOrderSale,
        PromoPlateId,
        PromoCategoryId,
        '',
        orders,
      );

      setOrderPrice(Number(summary));
    } else {
      let allSale = 0;

      for (const item of promos) {
        const { saleNum } = calculateValues(
          String(item.PromocodeType),
          item.SalePrice,
          item.SalePercent,
          orderSum,
          delivery?.localOrderSale,
          item.plateIds,
          item.categoryId,
          item.subCategory,
          orders,
        );

        if (saleNum) {
          allSale += saleNum;
        }
      }

      setOrderPrice(Number(orderSum) - Number(allSale));
    }
  }, [
    PromocodeType,
    SalePrice,
    SalePercent,
    orderSum,
    delivery?.localOrderSale,
    PromoPlateId,
    PromoCategoryId,
    orders,
    promocode,
    promoIsCombined,
    promos,
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
    maxValue > 0 && (
      <div className='max-w-[100%] rounded-xl bg-bgMain px-4 py-[18px] shadow-cartBlockShadow lg:mx-[22px]'>
        <div className='w-[100%]'>
          <div className='flex items-center justify-between'>
            <Typography variant='p' className='!text-base font-semibold'>
              Потратить {Number(decreaseBonus / bonusPercentMax).toFixed(0)} баллов
            </Typography>
            <Typography variant='desc' className='!text-xs text-secondary'>
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
            disabled={!!promocode}
          />
        </div>
      </div>
    )
  );
};

export default CartPoints;
