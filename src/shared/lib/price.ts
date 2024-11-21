import { PRICE_CONFIG, PRICE_CONFIG_LANG } from '@/global-config';

export const priceFormatter = (value?: number | string, isNoCeil?: boolean) => {
  return new Intl.NumberFormat(PRICE_CONFIG_LANG, {
    ...PRICE_CONFIG,
    style: 'currency',
    minimumFractionDigits: 0,
    useGrouping: true,
  })
    .format(isNoCeil ? Number(value) : Math.ceil(Number(value)))
    .replace(/\s/, ' ');
};
