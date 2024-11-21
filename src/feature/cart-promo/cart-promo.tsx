/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import PromoCarousel from './el/promoCarousel';
import styles from './style.module.css';

import PromoTitleIcon from '@/assets/promo/promo-title-icon.svg';
import { type IAutoPromocodes } from '@/shared/api/get-min-delivery-price';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';
import { checkPromocode } from '@/widgets/cart-widget/api/cart-api';
import { useCart } from '@/widgets/cart-widget/state';

const CartPromo: React.FC<{ autoPromocodes?: IAutoPromocodes }> = ({
  autoPromocodes,
}) => {
  const { mutateAsync } = useMutation({ mutationFn: checkPromocode });
  const [error, setError] = useState<string | number>('');
  const [promocodeValue, setPromocodValue] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const { address } = useAddress();
  const { onOpen } = useModal();
  const { isAuth } = useAuth();

  const {
    orderSum,
    applyPromocode,
    PromocodeType,
    removePromocode,
    promocode,
    promocodeDescription,
  } = useCart();

  enum responseStatus {
    'NOT-FOUND' = 'Промокод не найден. Попробуйте другой',
    'ERROR' = 'Произошла непредвиденная ошибка, попробуйте позже',
  }

  useEffect(() => {
    setPromocodValue(promocode ?? '');
    !!promocode && setShowButton(true);
    !!promocode && setShowPlaceholder(false);
  }, [promocode]);

  const promocodeAlreadyExist = PromocodeType;

  const submitHandler = async () => {
    if (isAuth) {
      if (promocodeAlreadyExist) {
        removePromocode();
        setPromocodValue('');
        setShowPlaceholder(true);
      } else {
        setError('');
        try {
          await mutateAsync({
            promocode: promocodeValue ?? '',
            deliveryType: String(address.LastAddressType ?? 2),
            OrganisationID: String(address.LastAddressOrgID ?? 0),
          }).then((data) => {
            if (data.error) {
              setError(data.message);
              removePromocode();
            } else {
              removePromocode();
              if (orderSum >= data?.MinCartPrice) {
                applyPromocode({ ...data, promocode: promocodeValue });
              } else {
                removePromocode();
                setError(`Cумма заказа должна быть не менее ${data?.MinCartPrice} ₽`);
              }
            }
          });
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            removePromocode();
            error.response.status !== 200 && setError(responseStatus.ERROR);
          }
        }
      }
    } else {
      onOpen('login');
    }
  };

  return (
    <div className='relative w-full'>
      <div
        className={cn(
          styles.giftWrapper,
          (autoPromocodes?.promocodes?.length ?? 0) <= 0 && 'pb-[18px]',
        )}
      >
        <div className=''>
          <Typography
            variant='p'
            className='mb-3 flex gap-2 px-[22px] !text-base !font-semibold'
          >
            <PromoTitleIcon className='h-6 w-6' />
            Промокод
          </Typography>
          <div
            className={cn(
              styles.promoInputWrapper,
              'mx-[22px]',
              (promocodeAlreadyExist || promocodeValue) && '!border-main',
              error && '!border-[#C14057]',
            )}
          >
            <Input
              value={promocodeValue}
              className={styles.promoInput}
              minLength={3}
              onChange={(e) => {
                setPromocodValue(e.target.value);
              }}
              onFocus={() => {
                setShowPlaceholder(false);
                setShowButton(true);
              }}
              onBlur={() => {
                !promocodeValue && setShowPlaceholder(true);
              }}
              disabled={!!promocodeAlreadyExist}
            />
            <div
              className={cn(
                'pointer-events-none absolute w-full items-center justify-center',
                showPlaceholder && !promocodeValue ? 'flex' : 'hidden',
              )}
            >
              <Typography
                variant='desc'
                className='!text-sm font-semibold uppercase leading-5 text-secondary'
              >
                + Ввести промокод
              </Typography>
            </div>
            <Button
              variant={'ghost'}
              className={cn(
                styles.promoButton,
                (!showButton || showPlaceholder) && 'hidden',
                'disabled:!text-main/50',
                'group-[hover]:hidden',
                promocodeAlreadyExist ? '!text-[#C14057]' : '!text-main',
              )}
              disabled={!promocodeValue}
              onClick={submitHandler}
            >
              {promocodeAlreadyExist ? 'очистить' : 'применить'}
            </Button>
          </div>
          {error && (
            <Typography variant='desc' className='mt-2 px-6 text-xs !text-[#C14057]'>
              {error}
            </Typography>
          )}
          {promocode && promocodeAlreadyExist && !error && (
            <Typography variant='desc' className='mt-2 px-6 text-xs !text-[#6BC140]'>
              Промокод применен. {promocodeDescription?.replaceAll('<br>', ' ')}
            </Typography>
          )}
        </div>
        {(autoPromocodes?.promocodes?.length ?? 0) > 0 && (
          <div className='h-[178px] max-lg:h-[190px]'></div>
        )}
      </div>
      {(autoPromocodes?.promocodes?.length ?? 0) > 0 && (
        <div className='absolute top-[117px] w-full'>
          <Typography
            variant='p'
            className='-mb-2 mt-5 flex gap-2 px-[44px] !text-base !font-semibold'
          >
            {autoPromocodes?.title}
          </Typography>
          <PromoCarousel
            promocodes={autoPromocodes?.promocodes}
            promocode={promocode}
            setError={setError}
          />
        </div>
      )}
    </div>
  );
};

export default CartPromo;
