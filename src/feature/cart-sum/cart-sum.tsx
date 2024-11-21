/* eslint-disable unicorn/no-useless-undefined */
import {
  type RefObject,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react';

import { calculateValues } from './lib/calculate-value';
import { checkGiftEligibility } from './lib/check-gift-eligibility';
import styles from './style.module.css';

import ZipIcon from '@/assets/icons/zip.svg';
import { SumItem } from '@/entities/cart-sum-item/cart-sum-item';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { toast } from '@/shared/components/use-toast';
import { priceFormatter } from '@/shared/lib/price';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';
import { useCart, useCartOpen } from '@/widgets/cart-widget/state';

const CartSum: React.FC<{
  setAdditivesError: Dispatch<SetStateAction<boolean | undefined>>;
  additivesRef: RefObject<HTMLElement>;
  deliveryMinPrice?: string;
  localOrderSale?: string;
}> = ({ setAdditivesError, additivesRef, deliveryMinPrice, localOrderSale }) => {
  const {
    bonus,
    ordersCount,
    orderSum,
    PromocodeType,
    SalePrice,
    SalePercent,
    additives,
    decreaseBonus,
    deliveryPrice,
    freeAdditives,
    availableGifts,
    gifts,
    PromoPlateId,
    PromoCategoryId,
    orders,
  } = useCart();
  const { onOpen } = useModal();
  const { onClose } = useCartOpen();
  const { isAuth } = useAuth();

  const [summary, setSummary] = useState<number>(orderSum);
  const [sale, setSale] = useState<string | undefined>(undefined);

  const { address } = useAddress();
  const isLastAddress = !!address?.LastAddressID || !!address?.LastAddressOrgID;

  const additivesCount = additives.reduce(
    (curr: any, acc: any) => curr + (acc.countInCart ?? 0),
    0,
  );

  // const { data: delivery } = useGetMinDeliveryPrice(
  //   Number(address.LastPolygonID),
  //   Number(address.LastAddressOrgID),
  //   Number(address.LastAddressType),
  //   Number(orderSum),
  // );

  const openPlacingOrderHandler = () => {
    if (freeAdditives > 0 && additivesCount <= 0) {
      additivesRef?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      setAdditivesError(true);
    } else if (orderSum < Number(deliveryMinPrice)) {
      toast({
        title: `Минимальная сумма заказа ${deliveryMinPrice}`,
        variant: 'main',
      });
    } else if (isLastAddress) {
      if (checkGiftEligibility(availableGifts, gifts, orderSum)) {
        onOpen('giftNotify');
      } else {
        onOpen('placingOrder');
        onClose();
      }
    } else {
      setAdditivesError(true);
      onClose();
      onOpen('addressNotSpecified');
    }
  };

  useEffect(() => {
    const { sale, summary } = calculateValues(
      PromocodeType,
      SalePrice,
      SalePercent,
      orderSum,
      localOrderSale,
      PromoPlateId,
      PromoCategoryId,
      orders,
    );

    setSale(sale);

    setSummary(Number(summary) - (decreaseBonus ?? 0));
  }, [SalePercent, orderSum, SalePrice, PromocodeType, decreaseBonus, localOrderSale]);

  return (
    <div>
      <div className={styles.sumList}>
        {isAuth && decreaseBonus === 0 && bonus > 0 && (
          <SumItem title='Начислим баллы' value={`+${bonus}`} icon={<ZipIcon />} />
        )}
        <SumItem title={`${ordersCount} товара`} value={priceFormatter(orderSum)} />
        {sale && Number(sale.split('')[0]) > 0 ? (
          <SumItem title='Скидка' value={sale} />
        ) : null}
        {Number(address.LastAddressType) === 1 && (
          <SumItem
            title='Доставка'
            value={
              deliveryPrice > 0
                ? `${
                    PromocodeType === '5'
                      ? priceFormatter(deliveryPrice - deliveryPrice * (SalePercent ?? 0))
                      : priceFormatter(deliveryPrice)
                  }`
                : 'Бесплатно'
            }
          />
        )}
      </div>
      <div className={styles.sumActions}>
        <div className={styles.sumActions__info}>
          <Typography variant='p' className='!text-lg !font-semibold'>
            Сумма заказа
          </Typography>
          <Typography variant='p' className='!whitespace-nowrap !text-xl !font-semibold'>
            {priceFormatter(
              Number(
                summary +
                  (PromocodeType === '5'
                    ? deliveryPrice - deliveryPrice * (SalePercent ?? 0)
                    : deliveryPrice),
              ).toFixed(0),
            )}
          </Typography>
        </div>
        <Button className={styles.sumActions__button} onClick={openPlacingOrderHandler}>
          К оформлению заказа
        </Button>
      </div>
    </div>
  );
};

export default CartSum;
