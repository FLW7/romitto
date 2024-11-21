import { type TCartGiftItem } from '@/widgets/cart-widget/config';

export function checkGiftEligibility(
  availableGifts: TCartGiftItem[],
  receivedGifts: TCartGiftItem[],
  orderSum: number,
) {
  // Преобразуем массив полученных подарков в объект для удобства проверки наличия подарка
  const receivedGiftsMap: Record<string, boolean> = {};

  for (const gift of receivedGifts) {
    receivedGiftsMap[gift.minPrice] = true;
  }

  // Проверяем каждый доступный подарок
  for (const gift of availableGifts) {
    // Проверяем, что сумма заказа больше minPrice подарка
    if (
      Number.parseInt(orderSum.toString()) > Number.parseInt(gift.minPrice.toString()) && // Проверяем, есть ли такой подарок среди полученных
      !receivedGiftsMap[gift.minPrice]
    ) {
      // Если условия выполнены, возвращаем true
      return true;
    }
  }

  // Если ни один подарок не соответствует условиям, возвращаем false
  return false;
}
