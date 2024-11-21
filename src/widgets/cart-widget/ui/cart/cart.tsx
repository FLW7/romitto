'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { GetOrderBonusesGetPercent } from '../../api/cart-api';
import { useCart } from '../../state';
import CartAdditives from '../cart-additives/basket-additives';
import CartCutlery from '../cart-cutlery/cart-cutlery';
import CartFooter from '../cart-footer/cart-footer';
import CartOrdersList from '../cart-orders-list/cart-orders-list';
import CartRecommendations from '../cart-recommendations/cart-recommendations';

import styles from './styles.module.css';

import CartGift from '@/entities/cart-gift/cart-gift';
import CartGiftPromo from '@/entities/cart-gift-promo/cart-gift-promo';
import CartHeader from '@/entities/cart-header/cart-header';
import CartDeliveryPrice from '@/feature/cart-delivery-price';
import CartPromo from '@/feature/cart-promo/cart-promo';
import { toast } from '@/shared/components/use-toast';
import { useGetProfile } from '@/shared/hooks/query/profile';
import { useGetMinDeliveryPrice } from '@/shared/hooks/query/use-get-min-delivery-price';
import { useAddress } from '@/shared/state/address';
import { ChooseGiftDynamic } from '@/widgets/modal/choose-gift/choose-gift.dynamic';
import { GetGiftDynamic } from '@/widgets/modal/get-gift/get-gift.dynamic';
import { GetGiftPromoDynamic } from '@/widgets/modal/get-gift-promo/get-gift-promo.dynamic';
import { GiftAvaliableDynamic } from '@/widgets/modal/gift-available/gift-available.dynamic';
import { GiftNotifyDynamic } from '@/widgets/modal/gift-notify/gift-notify.dynamic';

export const Cart: React.FC = () => {
  const {
    recommendations,
    calculateSum,
    additives,
    cutlery,
    availableGifts,
    setBonusPercent,
    setBonusGetMax,
    setBonusPercentMax,
    setBonusPaymentMax,
    setPriceForAddition,
    setPriceForCutlery,
    orderSum,
    setDeliveryPrice,
    clearGifts,
    gifts,
    PromoGifts,
    PromoGiftsAvailiable,
  } = useCart();
  const { data: profile } = useGetProfile();

  const {
    data,
    isSuccess,
    refetch: refetchBonus,
  } = useQuery({
    queryKey: [`GetOrderBonusesGetPercent`],
    queryFn: async () => await GetOrderBonusesGetPercent(),
  });

  const { address } = useAddress();
  const { data: delivery, refetch } = useGetMinDeliveryPrice(
    Number(address.LastPolygonID),
    Number(address.LastAddressOrgID),
    Number(address.LastAddressType),
    Number(orderSum),
  );

  const [giftStep, setGiftStep] = useState(1);

  const [additivesError, setAdditivesError] = useState<boolean | undefined>();
  const additivesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void refetchBonus();
  }, [profile?.Bulkprices]);

  useEffect(() => {
    void refetch();
  }, [address.LastPolygonID]);

  useEffect(() => {
    if (delivery?.deliveryPriceSteps?.length) {
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
  }, [orderSum, delivery]);

  useEffect(() => {
    if (isSuccess && data) {
      data.PriceForAddition && setPriceForAddition(data.PriceForAddition);
      data.PriceForCutlery && setPriceForCutlery(data.PriceForCutlery);

      data.OrderBonusesGetMax && setBonusGetMax(data.OrderBonusesGetMax);
      data.OrderBonusesGetPercent && setBonusPercent(data.OrderBonusesGetPercent);
      data.MaxBonusesPercent && setBonusPercentMax(data.MaxBonusesPercent);
      data.MaxBonusesPayment && setBonusPaymentMax(data.MaxBonusesPayment);
    }
    calculateSum();
  }, [data, isSuccess]);

  useEffect(() => {
    if (delivery?.addGift === 0 && gifts.length > 0) {
      toast({
        title: 'При самовывозе подарки недоступны',
        description: 'ваши подарки были удалены',
      });
      clearGifts();
    }
  }, [delivery]);

  return (
    <>
      <div className={styles.sheetContentOverflow}>
        <div className='flex min-h-[calc(100%-205px)] flex-col gap-y-[6px] lg:pt-6'>
          <div className='rounded-b-xl max-lg:bg-white max-lg:p-4 max-lg:shadow-cartBlockShadow lg:px-[22px]'>
            <CartHeader />
            <div className='mb-3 lg:mb-[6px]'>
              <CartDeliveryPrice deliveryMinPrice={delivery?.orderMinPrice} />
            </div>
            {availableGifts?.length > 0 && <CartGift setGiftStep={setGiftStep} />}
          </div>
          <div className='flex flex-col gap-[6px] lg:px-[22px]'>
            <CartOrdersList />
            {cutlery?.length > 0 && <CartCutlery />}
            {additives?.length > 0 ? (
              <CartAdditives
                ref={additivesRef}
                additivesError={additivesError}
                setAdditivesError={setAdditivesError}
              />
            ) : null}
            {(PromoGifts?.length ?? 0) > 0 && Number(PromoGiftsAvailiable ?? 0) > 0 && (
              <div className='mt-[58px]'>
                <CartGiftPromo />
              </div>
            )}
          </div>
          <CartPromo autoPromocodes={delivery?.autoPromocodes} />
          {recommendations.length > 0 && (
            <CartRecommendations
              classNameItem='basis-[70%]'
              items={recommendations}
              title='Рекомендуем к покупке'
            />
          )}
        </div>
        <CartFooter
          setAdditivesError={setAdditivesError}
          additivesRef={additivesRef}
          deliveryMinPrice={delivery?.orderMinPrice}
          localOrderSale={delivery?.localOrderSale}
        />
      </div>

      <GetGiftDynamic />
      <GetGiftPromoDynamic />
      <GiftNotifyDynamic />
      <ChooseGiftDynamic giftStep={giftStep} setGiftStep={setGiftStep} />
      {delivery?.addGift === 1 && <GiftAvaliableDynamic />}
    </>
  );
};
