import { priceFormatter } from '@/shared/lib/price';

export const covertValueForDetailOrder = (line: string, value?: string) => {
  if (!value) return '';

  switch (line) {
    case 'orderID': {
      return '#' + value;
    }
    case 'salePrice': {
      return priceFormatter(value);
    }
    case 'deliveryType': {
      return value === '1' ? 'Доставка' : 'Самовывоз';
    }
    case 'payType': {
      // eslint-disable-next-line unicorn/prefer-switch
      if (value === '0') {
        return 'Оплата наличными';
      } else if (value === '1') {
        return 'Оплата картой при получении';
      } else if (value === '2') {
        return 'Оплата картой';
      }
    }
    // eslint-disable-next-line no-fallthrough
    case 'orderDate': {
      return value === 'now' ? 'Как можно скорее' : `Предзаказ ${value}`;
    }
    default: {
      return value;
    }
  }
};
