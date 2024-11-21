/* eslint-disable unicorn/no-nested-ternary */
import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import styles from '../style.module.css';

import ZipIcon from '@/assets/icons/zip.svg';
import { SumItem } from '@/entities/cart-sum-item/cart-sum-item';
import { calculateValues } from '@/feature/cart-sum/lib/calculate-value';
import { Button } from '@/shared/components/button';
import TooltipCustom from '@/shared/components/tooltip/tooltip-custom';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import { useAddress } from '@/shared/state/address';
import { useCart } from '@/widgets/cart-widget/state';

const SummaryBlock: React.FC<{ localOrderSale: string | undefined }> = ({
  localOrderSale,
}) => {
  const {
    orderSum,
    decreaseBonus,
    ordersCount,
    PromocodeType,
    SalePrice,
    SalePercent,
    deliveryPrice,
    PromoPlateId,
    PromoCategoryId,
    orders,
    bonus,
  } = useCart();

  const { address } = useAddress();
  const [sale, setSale] = useState<string>();
  const [summary, setSummary] = useState<string>();

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
    setSummary(summary.toString());
  }, [localOrderSale, PromocodeType, address.LastAddressType]);

  const { formState } = useFormContext();

  return (
    <div className={styles.summaryBlock}>
      <Typography variant='p' className='mb-3 text-lg font-semibold'>
        Итого:
      </Typography>
      <div>
        <div className={styles.sumList}>
          <SumItem
            title={`${ordersCount} товара`}
            value={priceFormatter(orderSum || 0)}
          />

          {Number(address.LastAddressType) === 1 && (
            <SumItem
              title='Доставка'
              value={
                deliveryPrice > 0
                  ? PromocodeType === '5'
                    ? priceFormatter(deliveryPrice - deliveryPrice * (SalePercent ?? 0))
                    : priceFormatter(deliveryPrice)
                  : 'Бесплатно'
              }
            />
          )}
          {!!sale && Number(sale.split('')[0]) > 0 && (
            <SumItem title='Скидка' value={sale} />
          )}
          {bonus > 0 && (
            <SumItem
              title='Начислим баллы'
              value={`+${Number(bonus).toFixed(0)}`}
              icon={<ZipIcon />}
            />
          )}
          {decreaseBonus > 0 && (
            <SumItem
              title='Потрачено баллов'
              value={`-${decreaseBonus}`}
              icon={<ZipIcon />}
            />
          )}
        </div>
        <div className={styles.sumActions}>
          <div className={styles.sumActions__info}>
            <Typography variant='p' className='text-lg font-semibold max-md:hidden'>
              Сумма заказа
            </Typography>
            <Typography variant='p' className='whitespace-nowrap text-2xl font-semibold'>
              {priceFormatter(
                Number(
                  Number(summary) +
                    (PromocodeType === '5'
                      ? deliveryPrice - deliveryPrice * (SalePercent ?? 0)
                      : deliveryPrice),
                ).toFixed(0),
              )}
            </Typography>
          </div>
          <TooltipCustom
            id='time-submit-tooltip'
            offset={10}
            isOpen={!!formState.errors.date}
          />
          <Button
            type='submit'
            data-tooltip-id={`time-submit-tooltip`}
            data-tooltip-content={'Выберите время доставки'}
            className={styles.sumActions__button}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryBlock;
