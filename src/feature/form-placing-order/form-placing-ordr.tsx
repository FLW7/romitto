/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import AdressBlock from './el/adress-block';
import PayRadioField from './el/pay-radio-field';
import SummaryBlock from './el/summary-block';
import styles from './style.module.css';
import { placingOrderFormSchema, type FormType } from './types';

import { FullFormField } from '@/entities/form-field';
import { DeliveryTabs } from '@/feature/form-placing-order/el/delivery-tabs';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { toast } from '@/shared/components/use-toast';
import { useGetProfile } from '@/shared/hooks/query/profile';
import { useGetMinDeliveryPrice } from '@/shared/hooks/query/use-get-min-delivery-price';
import { useGetParamAddress } from '@/shared/hooks/use-get-param-address';
import { formatDate } from '@/shared/lib/format-date';
import { phoneMask } from '@/shared/lib/phone-mask';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';
import ConfirmOrderPopup from '@/widgets/modal/placing-order/el/confirm-order-popup';
import TimePickerPoup from '@/widgets/modal/placing-order/el/time-picker-popup/time-picker-popup';
import PlacuingOrderCode from '@/widgets/modal/placing-order-code';

export const FormPlacingOrder = () => {
  const { isAuth } = useAuth();
  const { address } = useAddress();
  const { setStep } = useDelivery();
  const { onOpen } = useModal();
  const { step } = useGetParamAddress();

  const { orderSum, giftAvailableChecks, setDeliveryPrice } = useCart();
  const [checkedPay, setCheckedPay] = useState<string>();
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [confirmOrderOpen, setConfirmOrderOpen] = useState(false);
  const [placingCodeOpen, setPlacingCodeOpen] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState<{ date: string; time: string }>();
  const [code, setCode] = useState<string | undefined>();

  const { data: profileData } = useGetProfile();

  const { data: delivery, refetch } = useGetMinDeliveryPrice(
    Number(address.LastPolygonID),
    Number(address.LastAddressOrgID),
    Number(address.LastAddressType),
    Number(orderSum),
  );

  const form = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(placingOrderFormSchema),
    criteriaMode: 'all',
    defaultValues: {
      name: profileData?.name,
      mail: profileData?.email,
      phone: phoneMask(profileData?.phone ?? ''),
    },
  });

  const openTimePicker = () => {
    setTimePickerOpen(true);
  };
  const closeTimePicker = () => {
    setTimePickerOpen(false);
  };

  const closeConfirmOrder = () => {
    console.log(1);

    setConfirmOrderOpen(false);
  };

  const openConfirmOrder = () => {
    setConfirmOrderOpen(true);
    closePlacingCode();
  };

  const closePlacingCode = () => {
    setPlacingCodeOpen(false);
  };

  const openPlacingCode = () => {
    setPlacingCodeOpen(true);
  };

  const radioHandler = (value: string) => {
    setCheckedPay(value);
    form.setValue('pay', value);
    form.setValue('moneyChange', '');
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit = () => {
    if (orderSum < Number(delivery?.orderMinPrice)) {
      toast({
        title: `Минимальная сумма заказа ${delivery?.orderMinPrice}`,
        variant: 'main',
      });
    } else {
      if (isAuth) {
        openConfirmOrder();
      } else {
        openPlacingCode();
      }
    }
  };

  useEffect(() => {
    if (delivery) {
      const firstDay = Object.entries(delivery?.allowedOrderTimeList)[0][0];
      const firstTime = Object.entries(delivery?.allowedOrderTimeList)[0][1][0];

      if (formatDate(new Date(firstDay)) === 'сегодня') {
        setDeliveryTime({
          date: firstDay,
          time: firstTime.isNow ? 'текущее' : firstTime.time,
        });
      }
    }
  }, [delivery?.allowedOrderTimeList]);

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

  useEffect(() => {
    deliveryTime && form.setValue('date', deliveryTime);
  }, [deliveryTime]);

  useEffect(() => {
    checkedPay && form.setValue('pay', checkedPay);
  }, [checkedPay, form]);

  useEffect(() => {
    void refetch();
  }, [address]);

  const [prevAddressType, setPrevAddressType] = useState<number | null>(0);

  useEffect(() => {
    if (prevAddressType === 2 && address.LastAddressType === 1) {
      // eslint-disable-next-line unicorn/no-array-for-each
      giftAvailableChecks.forEach((item: number) => {
        if (orderSum > item) {
          onOpen('giftAvaliable', {}, 'placingOrder');

          giftAvailableChecks.splice(giftAvailableChecks.indexOf(item), 1);
        }
      });
    }

    setPrevAddressType(address.LastAddressType);
  }, [orderSum, address.LastAddressType]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex h-full flex-col min-[1200px]:pr-8'
      >
        <Typography variant={'h5'} className={styles.title}>
          Оформление заказа
        </Typography>
        <div
          className={
            'flex h-full w-full justify-between gap-14 max-[1200px]:flex-col max-md:overflow-y-auto max-md:pb-4 min-[800px]:h-[600px]'
          }
        >
          <div className={'flex w-full flex-col gap-4 max-md:px-4'}>
            <DeliveryTabs
              step={address?.LastAddressType === 2 ? 'pickup' : 'delivery'}
              deliveryClick={() => {
                setStep(isAuth ? 'delivery' : 'addAddress');
                onOpen('choosingMyLocation', { title: 'Укажите адрес' }, 'placingOrder');
              }}
              pickupClick={() => {
                setStep('pickup');
                onOpen('choosingMyLocation', {}, 'placingOrder');
              }}
            />
            <AdressBlock
              title={address.LastAddressType === 1 ? 'Доставка' : 'Самовывоз'}
              openTimePicker={openTimePicker}
              deliveryTime={deliveryTime}
              className={'mb-8 '}
              nowText={
                (Number(delivery?.orderDeliveryTime) ?? 0) > 0 ||
                (Number(delivery?.timeForSelfPickup) ?? 0) > 0
                  ? `Как можно быстрее ~${delivery?.orderDeliveryTime || delivery?.timeForSelfPickup} мин`
                  : 'Как можно быстрее'
              }
              onClickAddress={() => {
                setStep(step);
                onOpen('choosingMyLocation', {}, 'placingOrder');
              }}
            />
            <FullFormField label={'Имя'} name={'name'} type='text' />
            <div className='flex gap-4 max-md:flex-col'>
              <FullFormField
                label={'Номер телефона'}
                name={'phone'}
                type='tel'
                fieldClassName='w-full'
              />
              <FullFormField
                label={'Электронная почта'}
                name={'mail'}
                type={'email'}
                fieldClassName='w-full'
              />
            </div>
            {delivery && delivery.orderPaymentTypes.length > 0 && (
              <PayRadioField
                label={'Cпособ оплаты'}
                name={'pay'}
                data={delivery.orderPaymentTypes}
                checkedPay={checkedPay}
                radioHandler={radioHandler}
              />
            )}
            {checkedPay === 'Наличными при получении' && (
              <FullFormField label={'Сдача с'} name={'moneyChange'} type='number' />
            )}
            <FullFormField label={'Комментарий'} name={'comment'} type='text' />
          </div>

          <div className='flex w-full flex-col gap-y-5'>
            <SummaryBlock localOrderSale={delivery?.localOrderSale} />
          </div>
        </div>
      </form>
      {timePickerOpen && (
        <TimePickerPoup
          closeTimePicker={closeTimePicker}
          deliveryTime={deliveryTime}
          setDeliveryTime={setDeliveryTime}
          timePickerOpen={timePickerOpen}
        />
      )}
      {confirmOrderOpen && (
        <ConfirmOrderPopup
          confirmOrderOpen={confirmOrderOpen}
          closeConfirmOrder={closeConfirmOrder}
          deliveryTime={deliveryTime}
          code={code}
          nowText={
            (Number(delivery?.orderDeliveryTime) ?? 0) > 0 ||
            (Number(delivery?.timeForSelfPickup) ?? 0) > 0
              ? `Как можно быстрее ~${delivery?.orderDeliveryTime || delivery?.timeForSelfPickup} мин`
              : 'Как можно быстрее'
          }
        />
      )}
      {placingCodeOpen && (
        <PlacuingOrderCode
          onClose={closePlacingCode}
          open={placingCodeOpen}
          phone={form.getValues('phone')}
          setCode={setCode}
          openConfirmPopup={openConfirmOrder}
        />
      )}
    </Form>
  );
};
