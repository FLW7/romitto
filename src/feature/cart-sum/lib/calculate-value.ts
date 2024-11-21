/* eslint-disable unicorn/prefer-ternary */
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export const calculateValues = (
  promocodeType: string | undefined,
  salePrice: number | undefined,
  salePercent: number | undefined,
  orderSum: number,
  localOrderSale: string | undefined,
  PromoPlateId: string | undefined,
  PromoCategoryId: string | undefined,
  PromoSubId: string | undefined,
  orders: ICartOrderItem[],
) => {
  let sale;
  let summary;
  let saleNum = 0;
  const platesIdArr = PromoPlateId?.split(',')?.filter(
    (item) => item !== '' && item !== ' ' && item !== '0',
  );

  const categoriesIdArr = PromoCategoryId?.split(',')?.filter(
    (item) => item !== '' && item !== ' ' && item !== '0',
  );

  const subIdArr = PromoSubId
    ? PromoSubId?.split(',')?.filter(
        (item) => item !== '' && item !== ' ' && item !== '0',
      )
    : [];

  if (platesIdArr?.length === 0 && categoriesIdArr?.length === 0) {
    switch (String(promocodeType)) {
      case '1': {
        if (Number(localOrderSale)) {
          sale = `${((salePrice ?? 0) + orderSum * (Number(localOrderSale) / 100)).toFixed(0)} ₽`;
          saleNum = orderSum * (Number(localOrderSale) / 100) - (salePrice ?? 0);

          summary = Number(orderSum - (saleNum > orderSum ? orderSum : saleNum));
        } else {
          sale = `${salePrice?.toFixed(0) ?? 0} ₽`;
          let saleNum = 0;

          if ((salePrice ?? 0) > orderSum) {
            saleNum = orderSum;
          } else {
            saleNum = salePrice ?? 0;
          }
          summary = Number(orderSum - saleNum);
        }
        break;
      }
      case '2': {
        if (Number(localOrderSale)) {
          sale = Number(salePercent ?? 0) * 100 + Number(localOrderSale) + ' %';
          summary = Number(
            salePercent
              ? orderSum - orderSum * (salePercent + Number(localOrderSale) / 100)
              : orderSum,
          );
        } else {
          if (salePercent) saleNum = orderSum * salePercent;
          sale = (salePercent ?? 0) * 100 + ' %';
          summary = Number(salePercent ? orderSum - orderSum * salePercent : orderSum);
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
  } else {
    if (platesIdArr?.length !== 0) {
      switch (promocodeType) {
        case '1': {
          for (const item of orders) {
            if (
              platesIdArr?.includes(String(item.id)) &&
              Number(item.canHaveSale) === 1
            ) {
              const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

              if (ordersPrice > (salePrice ?? 0)) {
                saleNum += salePrice ?? 0;
              } else {
                saleNum += ordersPrice;
              }

              if (Number(localOrderSale)) {
                sale = `${(Number(saleNum ?? 0) + orderSum * (Number(localOrderSale) / 100)).toFixed(0)} ₽`;
                summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
              } else {
                sale = `${saleNum ?? 0} ₽`;
                summary = orderSum - saleNum;
              }
            }
          }
          console.log(saleNum);

          break;
        }
        case '2': {
          for (const item of orders) {
            if (
              platesIdArr?.includes(String(item.id)) &&
              Number(item.canHaveSale) === 1
            ) {
              const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

              saleNum += salePercent ? ordersPrice * salePercent : 0;

              if (Number(localOrderSale)) {
                sale = saleNum.toFixed(0) + ' ₽';
                summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
              } else {
                sale = saleNum.toFixed(0) + ' ₽';
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
    if (categoriesIdArr?.length !== 0) {
      switch (promocodeType) {
        case '1': {
          for (const item of orders) {
            if (
              categoriesIdArr?.includes(String(item.categoryID)) &&
              Number(item.canHaveSale) === 1
            ) {
              const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

              if (ordersPrice > (salePrice ?? 0)) {
                saleNum += salePrice ?? 0;
              } else {
                saleNum += ordersPrice;
              }

              if (Number(localOrderSale)) {
                sale = `${(Number(saleNum ?? 0) + orderSum * (Number(localOrderSale) / 100)).toFixed(0)} ₽`;
                summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
              } else {
                sale = `${saleNum.toFixed(0) ?? 0} ₽`;
                summary = orderSum - saleNum;
              }
            }
          }
          break;
        }
        case '2': {
          for (const item of orders) {
            if (
              categoriesIdArr?.includes(String(item.categoryID)) &&
              Number(item.canHaveSale) === 1
            ) {
              const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

              saleNum += salePercent ? ordersPrice * salePercent : 0;

              if (Number(localOrderSale)) {
                sale = saleNum.toFixed(0) + ' ₽';
                summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
              } else {
                sale = saleNum.toFixed(0) + ' ₽';

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
    if (subIdArr?.length !== 0) {
      switch (promocodeType) {
        case '1': {
          for (const item of orders) {
            if (
              subIdArr?.includes(String(item.parentID)) &&
              Number(item.canHaveSale) === 1
            ) {
              const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

              if (ordersPrice > (salePrice ?? 0)) {
                saleNum += salePrice ?? 0;
              } else {
                saleNum += ordersPrice;
              }

              if (Number(localOrderSale)) {
                sale = `${(Number(saleNum ?? 0) + orderSum * (Number(localOrderSale) / 100)).toFixed(0)} ₽`;
                summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
              } else {
                sale = `${saleNum.toFixed(0) ?? 0} ₽`;
                summary = orderSum - saleNum;
              }
            }
          }
          break;
        }
        case '2': {
          for (const item of orders) {
            if (
              subIdArr?.includes(String(item.parentID)) &&
              Number(item.canHaveSale) === 1
            ) {
              const ordersPrice = (item?.price ?? 0) * (item?.countInCart ?? 0);

              saleNum += salePercent ? ordersPrice * salePercent : 0;

              if (Number(localOrderSale)) {
                sale = saleNum.toFixed(0) + ' ₽';
                summary = orderSum - orderSum * (Number(localOrderSale) / 100) - saleNum;
              } else {
                sale = saleNum.toFixed(0) + ' ₽';

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
  }

  if (summary === undefined || summary === null) {
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
    summary: summary?.toFixed(0),
    saleNum,
  };
};
