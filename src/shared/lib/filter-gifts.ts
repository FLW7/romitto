import { type TCartGiftItem } from '@/widgets/cart-widget/config';

export const FilterGiftLevelArr = (arr: TCartGiftItem[], gifts: TCartGiftItem[]) => {
  const giftLevelArr = [];

  for (const item of arr || []) {
    if (gifts.every((gift: TCartGiftItem) => item.minPrice !== gift.minPrice))
      giftLevelArr.push(item.minPrice);
  }
  giftLevelArr.sort((a: number, b: number) => a - b);

  return giftLevelArr;
};
