import { priceFormatter } from '@/shared/lib/price';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export const calculateValues = (
  promocodeType: string | undefined,
  salePrice: number | undefined,
  salePercent: number | undefined,
  orderSum: number,
  localOrderSale: string | undefined,
  PromoPlateId: string | undefined,
  PromoCategoryId: string | undefined,
  orders: ICartOrderItem[],
) => {
  let sale;
  let summary;
  const platesIdArr = PromoPlateId?.split(',')?.filter(
    (item) => item !== '' && item !== ' ',
  );

  const categoriesIdArr = PromoCategoryId?.split(',')?.filter(
    (item) => item !== '' && item !== ' ',
  );

  if (platesIdArr?.length === 0 && categoriesIdArr?.length === 0) {
    switch (promocodeType) {
      case '1': {
        if (Number(localOrderSale)) {
          sale = priceFormatter(
            ((salePrice ?? 0) + orderSum * (Number(localOrderSale) / 100)).toFixed(0),
          );
          summary = Number(
            orderSum - orderSum * (Number(localOrderSale) / 100) - (salePrice ?? 0),
          );
        } else {
          sale = priceFormatter(salePrice?.toFixed(0) ?? 0);
          summary = Number(orderSum - (salePrice ?? 0));
        }
        break;
      }
      case '2': {
        if (Number(localOrderSale)) {
          console.log(1);

          sale = Number(salePercent ?? 0) + Number(localOrderSale) + ' %';
          summary = Number(
            salePercent
              ? orderSum - orderSum * (salePercent / 100 + Number(localOrderSale) / 100)
              : orderSum,
          );
        } else {
          console.log(2);

          sale = (salePercent ?? 0) + ' %';
          summary = Number(
            salePercent ? orderSum - orderSum * (salePercent / 100) : orderSum,
          );
        }
        break;
      }
      default: {
        if (Number(localOrderSale)) {
          sale = `${localOrderSale} %`;

          summary = orderSum - orderSum * (Number(localOrderSale) / 100);
        } else {
          sale = undefined;
          summary = orderSum;
        }
        break;
      }
    }
  } else if (platesIdArr?.length !== 0 && platesIdArr?.[0] !== '0') {
    switch (promocodeType) {
      case '1': {
        let saleNum = 0;

        for (const item of orders) {
          if (platesIdArr?.includes(String(item.id)) && Number(item.canHaveSale) === 1) {
            const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

            saleNum += ordersPrice > (salePrice ?? 0) ? salePrice ?? 0 : ordersPrice;

            if (Number(localOrderSale)) {
              sale = priceFormatter(
                (
                  Number(saleNum ?? 0) +
                  orderSum * (Number(localOrderSale) / 100)
                ).toFixed(0),
              );
              summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
            } else {
              sale = priceFormatter(saleNum ?? 0);
              summary = orderSum - saleNum;
            }
          }
        }
        break;
      }
      case '2': {
        let saleNum = 0;

        for (const item of orders) {
          if (platesIdArr?.includes(String(item.id)) && Number(item.canHaveSale) === 1) {
            const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

            saleNum += salePercent ? ordersPrice * (salePercent / 100) : 0;

            if (Number(localOrderSale)) {
              sale = priceFormatter(saleNum.toFixed(0));
              summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
            } else {
              sale = priceFormatter(saleNum.toFixed(0));
              summary = orderSum - saleNum;
            }
          }
        }
        break;
      }
      default: {
        if (Number(localOrderSale)) {
          sale = `${localOrderSale} %`;
          summary = orderSum - orderSum * (Number(localOrderSale) / 100);
        } else {
          sale = undefined;
          summary = orderSum;
        }
        break;
      }
    }
  } else if (categoriesIdArr?.length !== 0 && categoriesIdArr?.[0] !== '0') {
    switch (promocodeType) {
      case '1': {
        let saleNum = 0;

        for (const item of orders) {
          if (
            categoriesIdArr?.includes(String(item.categoryID)) &&
            Number(item.canHaveSale) === 1
          ) {
            const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

            saleNum += ordersPrice > (salePrice ?? 0) ? salePrice ?? 0 : ordersPrice;

            if (Number(localOrderSale)) {
              sale = priceFormatter(
                (
                  Number(saleNum ?? 0) +
                  orderSum * (Number(localOrderSale) / 100)
                ).toFixed(0),
              );
              summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
            } else {
              sale = priceFormatter(saleNum.toFixed(0) ?? 0);
              summary = orderSum - saleNum;
            }
          }
        }
        break;
      }
      case '2': {
        let saleNum = 0;

        for (const item of orders) {
          if (
            categoriesIdArr?.includes(String(item.categoryID)) &&
            Number(item.canHaveSale) === 1
          ) {
            const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

            saleNum += salePercent ? ordersPrice * (salePercent / 100) : 0;

            if (Number(localOrderSale)) {
              sale = priceFormatter(saleNum.toFixed(0));
              summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
            } else {
              sale = priceFormatter(saleNum.toFixed(0));

              summary = orderSum - saleNum;
            }
          }
        }
        break;
      }
      default: {
        if (Number(localOrderSale)) {
          sale = `${localOrderSale} %`;
          summary = orderSum - orderSum * (Number(localOrderSale) / 100);
        } else {
          sale = undefined;
          summary = orderSum;
        }
        break;
      }
    }
  }

  if (!summary) {
    if (Number(localOrderSale)) {
      sale = `${localOrderSale} %`;
      summary = orderSum - orderSum * (Number(localOrderSale) / 100);
    } else {
      sale = undefined;
      summary = orderSum;
    }
  }

  return {
    sale,
    summary: Number(summary) > 0 ? summary?.toFixed(0) : 0,
  };
};
