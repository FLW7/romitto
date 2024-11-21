/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type {
  TAdditiveItem,
  ICartOrderItem,
  TCartGiftItem,
  ICartData,
  TCartPlateModifiers,
} from './config';

import { trackAddToCart } from '@/shared/lib/add-plate-metrik';
import { trackDeleteFromCart } from '@/shared/lib/delete-plate-metrik';

interface CartOpenStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCartOpen = create<CartOpenStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

interface TAdditionalTable {
  id: number;
  plateCounterFrom: number;
  plateCounterTo: number;
  countFree: number;
}

interface IPromosItem {
  plateIds: string;
  gift_ids: string;
  SalePrice: number;
  categoryId: string;
  SalePercent: number;
  PromocodeType: string;
  discountIikoId: string;
  cashbackPercent: number;
  subCategory: string;
}

interface IPromocodeData {
  GiftName: string;
  MinCartPrice: string;
  PromocodeType: '1' | '2' | '3' | '4' | '5' | '6';
  promocode?: string;
  SalePercent: string;
  SalePrice: string;
  categoryId: string;
  plateId: string;
  cashbackPercent: string;
  deliverySale: string;
  description: string;
  gifts?: IPromoGift[];
  usesLeft?: number;
  canSumWithBonuses?: '1' | '0';
  canSumWithGifts?: '1' | '0';
  canSumWithOtherPromos?: '1' | '0';
  isCombinedPromos: '1' | '0';
  promos: IPromosItem[];
}

export interface IPromoGift {
  picture: string;
  id: string;
  title: string;
}
export interface IPromoGiftAdd {
  picture: string;
  id: string;
  title: string;
  count: number;
}
interface ICartStore extends ICartData {
  totalPrice: number;
  totalOrderModifiers: number;
  giftMaxPrice: number;
  plates: ICartOrderItem[];
  freeAdditives: number;
  countAddititions: number;
  priceForAddition: number;
  priceForCutlery: number;
  additivesPrice: number;
  cutleriesPrice: number;
  additionalTable: TAdditionalTable[];
  bonus: number;
  decreaseBonus: number;
  bonusGetMax: number;
  bonusPercent: number;
  bonusPercentMax: number;
  bonusPaymentMax: number;
  GiftName?: string;
  PromocodeType?: '' | '1' | '2' | '3' | '4' | '5' | '6';
  canSumWithBonuses?: '1' | '0';
  canSumWithOtherPromos?: 1 | 0;
  canSumWithGifts?: '1' | '0';
  promocode?: string;
  promocodeDescription?: string;
  PromoGifts?: IPromoGift[];
  AddedPromoGifts: IPromoGiftAdd[];
  promoIsCombined: '1' | '0';
  PromoCominedSalePercent: number[];
  PromoCominedSalePrice: number[];
  promos: IPromosItem[];
  PromoGiftsAvailiable?: number;
  PromoUsesLeft?: number;
  SalePercent?: number;
  SalePrice?: number;
  PromoCategoryId?: string;
  PromoPlateId?: string;
  PromocodeMinPrice: number;
  giftAvailableChecks: number[];
  potentialRecsIds: number[];
  giftsType: number;
  giftLevelPriceArr: number[];
  deliveryPrice: number;
  cashbackPercent: number;
  addPromoGift: (item: IPromoGiftAdd) => void;
  calculateSum: () => void;
  addPlate: (item: ICartOrderItem) => void;
  deletePlate: (id: number, modifiers?: TCartPlateModifiers[], mass?: string) => void;
  changePlateCount: (
    id: number,
    value: number,
    modifiers?: TCartPlateModifiers[],
    mass?: string,
  ) => void;
  changeCutleryCount: (id: number, value: number) => void;
  changeAdditivesCount: (id: number, value: number) => void;
  addGift: (item: TCartGiftItem) => void;
  deleteGift: (id: number) => void;
  setAdditives: (arr: TAdditiveItem[]) => void;
  setCutleries: (arr: TAdditiveItem[]) => void;
  setAvailableGifts: (arr: TCartGiftItem[]) => void;
  setRecommendations: (arr: ICartOrderItem[]) => void;
  setAdditionalTable: (arr: TAdditionalTable[]) => void;
  setBonusGetMax: (id: number) => void;
  setBonusPercent: (id: number) => void;
  setBonusPercentMax: (id: number) => void;
  setBonusPaymentMax: (id: number) => void;
  setPlates: (arr: ICartOrderItem[]) => void;
  applyPromocode: (data: IPromocodeData) => void;
  setPromocode: (value: string) => void;
  removePromocode: () => void;
  setDecreaseBonus: (value: number) => void;
  setGiftAvailableChecks: (arr: number[]) => void;
  setGiftLevelPriceArr: (arr: number[]) => void;
  setPotentialRecsIds: (arr: number[]) => void;
  setGiftType: (value: number) => void;
  clearCart: () => void;
  setPriceForAddition: (value: number) => void;
  setPriceForCutlery: (value: number) => void;
  setDeliveryPrice: (value: number) => void;
  setPlateComment: (
    id: number,
    value: string,
    modifiers?: TCartPlateModifiers[],
    mass?: string,
  ) => void;
  clearGifts: () => void;
}

const getMods = (modifiers?: TCartPlateModifiers[]) => {
  return modifiers?.flatMap((item) => item.items.map((subItem) => subItem.id));
};

const ordersItemsAction = (
  id: number,
  orders: ICartOrderItem[],
  modifiers?: TCartPlateModifiers[],
  mass?: string,
) => {
  const originMods = getMods(modifiers);

  const newOrders = [...orders];

  for (const [key, item] of newOrders.entries()) {
    const itemMods = item?.modifiers?.flatMap((item) =>
      item.items.map((subItem) => Number(subItem.id)),
    );

    if (
      (originMods === undefined || originMods.length === 0) &&
      String(mass) === String(item.values[0].mass)
    ) {
      if (Number(item.id) === Number(id) && itemMods === undefined) {
        return key;
      }
    } else {
      const sameId = Number(item.id) === Number(id);
      const sameLength = itemMods?.length === originMods?.length;

      const sameMods = originMods?.every((item) => itemMods?.includes(Number(item)));
      const sameMass = mass === item.values[0].mass;

      if (sameLength && sameMods && sameId && sameMass) {
        return key;
      }
    }
  }

  return null;
};

export const useCart = create<ICartStore>()(
  devtools(
    persist(
      (set, get) => ({
        totalPrice: 0,
        totalOrderModifiers: 0,
        ordersCount: 0,
        orderSum: 0,
        deliveryPrice: 0,
        deliverySum: 0,
        giftMaxPrice: 0,
        freeAdditives: 0,
        countAddititions: 0,
        priceForAddition: 0,
        priceForCutlery: 0,
        additionalTable: [],
        additivesPrice: 0,
        cutleriesPrice: 0,
        canSumWithBonuses: '1',
        canSumWithGifts: '1',
        canSumWithOtherPromos: 1,
        bonus: 0,
        decreaseBonus: 0,
        bonusGetMax: 0,
        bonusPercent: 0,
        bonusPercentMax: 0,
        bonusPaymentMax: 0,
        orders: [],
        plates: [],
        gifts: [],
        giftsType: 1,
        giftLevelPriceArr: [],
        availableGifts: [],
        giftAvailableChecks: [],
        recommendations: [],
        additives: [],
        cutlery: [],
        GiftName: '',
        PromocodeType: '',
        PromoCategoryId: '',
        PromoPlateId: '',
        promoIsCombined: '0',
        PromoCominedSalePercent: [],
        PromoCominedSalePrice: [],
        promos: [],
        cashbackPercent: 0,
        SalePercent: 0,
        SalePrice: 0,
        PromocodeMinPrice: 0,
        potentialRecsIds: [],
        AddedPromoGifts: [],

        updateTotalOrderModifiers: (totalOrderModifiers: number) => {
          set({ totalOrderModifiers });
        },

        updateTotalPrice: (totalPrice: number) => {
          set({ totalPrice });
        },

        calculateSum: () => {
          set({ orders: get().orders.filter((item) => Number(item.price) > 0) });
          const newOrdersCount =
            get().totalOrderModifiers +
            get().orders.reduce((acc, curr) => acc + (curr.countInCart || 1), 0);

          set({
            countAddititions: get().orders.reduce(
              (acc, curr) =>
                Number(acc) +
                (Number(curr.countAdditions) || 0) * (curr?.countInCart ?? 1),
              0,
            ),
          });
          for (const table of get().additionalTable) {
            if (Number(get().countAddititions) >= Number(table.plateCounterFrom)) {
              set({ freeAdditives: table.countFree });
            } else {
              if (get().countAddititions < get().additionalTable[0].plateCounterFrom) {
                set({ freeAdditives: 0 });
              }
            }
          }
          const additivitesCount = get().additives.reduce(
            (acc, curr) => acc + (curr.countInCart || 0),
            0,
          );

          get().priceForAddition > 0
            ? set({
                additivesPrice:
                  additivitesCount > get().freeAdditives
                    ? get().priceForAddition * (additivitesCount - get().freeAdditives)
                    : 0,
              })
            : set({
                additivesPrice: get().additives.reduce(
                  (acc, curr) =>
                    acc + Number((curr?.countInCart ?? 0) * (curr?.price ?? 0)),
                  0,
                ),
              });
          const cutleryCount = get().cutlery.reduce(
            (acc, curr) => acc + (curr.countInCart || 0),
            0,
          );

          set({
            cutleriesPrice: get().priceForCutlery * (cutleryCount - get().freeAdditives),
          });
          if (get().PromocodeType === '4') {
            set({
              bonus: Math.round(
                get().orderSum * get().cashbackPercent <= get().bonusGetMax
                  ? get().orderSum * get().cashbackPercent
                  : get().bonusGetMax,
              ),
            });
          } else {
            set({
              bonus: Math.round(
                get().orderSum * get().bonusPercent <= get().bonusGetMax
                  ? get().orderSum * get().bonusPercent
                  : get().bonusGetMax,
              ),
            });
          }
          set({
            orderSum:
              get().totalPrice +
              get().deliverySum +
              get().additivesPrice +
              get().cutleriesPrice +
              get().orders.reduce((acc, curr) => {
                let total = acc;

                if (curr.price) {
                  total += Number(curr.price) * (curr.countInCart || 1);
                }

                return total;
              }, 0),
            ordersCount: newOrdersCount,
          });
          for (const gift of get().gifts) {
            if (get().orderSum < gift.minPrice) {
              get().deleteGift(gift.id);
            }
          }
          if (
            get().PromocodeType === '6' &&
            (get().PromoCategoryId || get().PromoPlateId)
          ) {
            const categoriesIdArr = get()
              .PromoCategoryId?.split(',')
              ?.filter((item) => item !== '' && item !== ' ');
            const platesIdArr = get()
              .PromoPlateId?.split(',')
              ?.filter((item) => item !== '' && item !== ' ');
            let sum = 0;

            if ((categoriesIdArr?.length ?? 0) > 0) {
              categoriesIdArr?.forEach((item) => {
                get().orders?.forEach((el) => {
                  if (Number(el?.categoryID) === Number(item)) {
                    sum += Number(el?.countInCart);
                  }
                });
              });
            } else {
              platesIdArr?.forEach((item) => {
                get().orders?.forEach((el) => {
                  if (Number(el?.id) === Number(item)) {
                    sum += Number(el?.countInCart);
                  }
                });
              });
            }
            set({ PromoGiftsAvailiable: sum });
          }
          let addedPromoGiftsCount = get().AddedPromoGifts?.reduce(
            (acc, cur) => acc + cur.count,
            0,
          );

          if ((get().PromoGiftsAvailiable ?? 0) < addedPromoGiftsCount) {
            const arr = [...get().AddedPromoGifts];

            while ((get().PromoGiftsAvailiable ?? 0) < addedPromoGiftsCount) {
              const item = arr?.at(-1);

              if (item) {
                if (item.count > 1) {
                  item.count = item?.count - 1;
                } else {
                  arr.splice(-1, 1);
                }
              }
              addedPromoGiftsCount = addedPromoGiftsCount - 1;
            }
            set({ AddedPromoGifts: arr });
          }
          if (get().orderSum < get().PromocodeMinPrice) get().removePromocode();
        },
        addPlate: (item) => {
          const findedKey = ordersItemsAction(
            item.id,
            get().orders,
            item.modifiers,
            item.values[0].mass,
          );

          if (findedKey === null) {
            set({
              orders: [...get().orders, { ...item, countInCart: item.countInCart || 1 }],
            });
            trackAddToCart(item);
          } else {
            const newOrders = [...get().orders];
            const newItem = {
              ...newOrders[findedKey],
              countInCart:
                (newOrders[findedKey].countInCart ?? 0) + (item.countInCart ?? 0),
            };

            newOrders[findedKey] = newItem;
            set({
              orders: newOrders,
            });
            trackAddToCart(item);
          }

          get().setRecommendations(get().orders);
          get().calculateSum();
        },
        deletePlate: (id, modifiers, mass) => {
          const findedKey = ordersItemsAction(id, get().orders, modifiers, mass);

          const newOrders = [...get().orders];

          if (findedKey !== null) {
            newOrders.splice(findedKey, 1);
            trackDeleteFromCart();
          }
          newOrders.length === 0 && get().clearCart();
          set({ orders: newOrders });
          get().calculateSum();
        },
        changePlateCount: (id, value, modifiers, mass) => {
          const findedKey = ordersItemsAction(id, get().orders, modifiers, mass);

          if (findedKey !== null) {
            const newOrders = [...get().orders];
            const newItem = {
              ...newOrders[findedKey],
              countInCart: value,
            };

            newOrders[findedKey] = newItem;
            set({ orders: newOrders });
          }

          get().calculateSum();
        },
        setPlateComment: (id, value, modifiers, mass) => {
          const findedKey = ordersItemsAction(id, get().orders, modifiers, mass);

          if (findedKey !== null) {
            const newOrders = [...get().orders];
            const newItem = {
              ...newOrders[findedKey],
              comment: value,
            };

            newOrders[findedKey] = newItem;
            set({ orders: newOrders });
          }
        },
        changeCutleryCount: (id, value) => {
          const newCutleries = get().cutlery.map((item) =>
            item.id === id ? { ...item, countInCart: value } : item,
          );

          set({ cutlery: newCutleries });

          get().calculateSum();
        },
        changeAdditivesCount: (id, value) => {
          const newAdditives = get().additives.map((item) =>
            item.id === id ? { ...item, countInCart: value } : item,
          );

          set({ additives: newAdditives });

          get().calculateSum();
        },
        addGift: (item) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { id, name, weight, picture, minPrice, delivery_type, type } = item;
          const giftWithSteps = get().giftsType === 2 || get().giftsType === 4;

          if (giftWithSteps && get().gifts && get().gifts.length > 0) {
            const anotherGift = get().gifts.find(
              (item: TCartGiftItem) => item.minPrice === minPrice,
            );

            anotherGift && get().deleteGift(anotherGift.id);
          }

          set({
            gifts: [
              ...get().gifts,
              { id, name, weight, picture, delivery_type, minPrice, type },
            ],
          });
          get().calculateSum();
        },
        deleteGift: (id) => {
          set({ gifts: get().gifts.filter((item) => item.id !== id) });
          get().calculateSum();
        },
        clearGifts: () => {
          set({ gifts: [] });
        },
        setAdditives: (arr) => {
          set({
            additives: arr,
          });
        },
        setPriceForAddition: (value) => {
          set({ priceForAddition: value });
        },
        setPriceForCutlery: (value) => {
          set({ priceForCutlery: value });
        },
        setCutleries: (arr) => {
          set({
            cutlery: arr,
          });
        },
        setAvailableGifts: (arr) => {
          set({
            // eslint-disable-next-line unicorn/no-array-reduce
            giftMaxPrice: arr.reduce((acc, curr) => {
              return Number.parseInt(curr.minPrice.toString()) >
                Number.parseInt(acc.toString())
                ? curr.minPrice
                : acc;
            }, 0),
            giftsType: Number.parseInt(arr?.[0]?.type?.toString() ?? ''),
          });
          set({
            availableGifts: arr,
          });
        },

        setPlates: (arr) => {
          set({
            plates: arr,
          });
        },

        setRecommendations: (orders) => {
          const recsIds = [];
          const recommendationPlates = [];

          for (const item of orders) {
            if (item.recomendations?.length > 0) {
              for (const el of item.recomendations) recsIds.push(el);
            }
          }

          for (const recId of recsIds) {
            for (const plate of get().plates) {
              if (plate.id.toString() === recId) {
                recommendationPlates.push(plate);
              }
            }
          }

          set({ recommendations: recommendationPlates });
        },
        setAdditionalTable: (arr) => {
          set({ additionalTable: arr });
        },
        setBonusPercent: (bonus) => {
          set({ bonusPercent: bonus });
        },
        setBonusGetMax: (bonus) => {
          set({ bonusGetMax: bonus });
        },
        setBonusPercentMax: (bonus) => {
          set({ bonusPercentMax: bonus });
        },
        setBonusPaymentMax: (bonus) => {
          set({ bonusPaymentMax: bonus });
        },
        addPromoGift: (item) => {
          const array = [...get().AddedPromoGifts];
          const itemIndex = array.findIndex((el) => Number(el.id) === Number(item.id));

          if (itemIndex > -1) {
            if (item.count > 0) {
              array[itemIndex].count = item.count;
            } else {
              array.splice(itemIndex, 1);
            }
          } else {
            array.push(item);
          }
          set({ AddedPromoGifts: array });
        },
        setPromocode: (value) => {
          set({ promocode: value });
        },
        applyPromocode: (data) => {
          set({ PromocodeType: data?.PromocodeType });
          set({ PromocodeMinPrice: Number.parseInt(data?.MinCartPrice) || 0 });
          set({ promocode: data.promocode || '' });
          set({ PromoCategoryId: data.categoryId });
          set({ PromoPlateId: data.plateId });
          set({ promocodeDescription: data.description });
          set({ gifts: [] });
          set({ promocodeDescription: data.description });
          set({ promoIsCombined: data.isCombinedPromos });
          set({ promos: data.promos });
          set({ canSumWithBonuses: data?.canSumWithBonuses ?? '1' });
          set({ canSumWithGifts: data?.canSumWithGifts ?? '1' });

          switch (data?.PromocodeType) {
            case '1': {
              set({ SalePrice: Number.parseInt(data.SalePrice) ?? 0 });
              set({ decreaseBonus: 0 });
              break;
            }
            case '2': {
              set({ SalePercent: Number(data.SalePercent) });
              set({ decreaseBonus: 0 });
              break;
            }
            case '3': {
              data?.gifts && set({ PromoGifts: data?.gifts });
              set({ decreaseBonus: 0 });
              break;
            }
            case '4': {
              set({ cashbackPercent: Number(data.cashbackPercent) });
              break;
            }
            case '5': {
              set({ SalePercent: Number(data.SalePercent) });
              set({ decreaseBonus: 0 });
              break;
            }
            case '6': {
              data?.gifts && set({ PromoGifts: data?.gifts });
              data?.usesLeft && set({ PromoUsesLeft: data?.usesLeft });
              set({ decreaseBonus: 0 });
              break;
            }
          }
          get().calculateSum();
        },
        removePromocode: () => {
          set({ SalePrice: 0 });
          set({ SalePercent: 0 });
          set({ GiftName: '' });
          set({ PromocodeType: '' });
          set({ promocode: '' });
          set({ cashbackPercent: 0 });
          set({ promocode: '' });
          set({ promocodeDescription: '' });
          set({ PromocodeMinPrice: 0 });
          set({ PromoGifts: [] });
          set({ PromoUsesLeft: 0 });
          set({ AddedPromoGifts: [] });
          set({ PromoUsesLeft: 0 });
          set({ PromoGiftsAvailiable: 0 });
          set({ PromoCominedSalePercent: [] });
          set({ PromoCominedSalePrice: [] });
          set({ promoIsCombined: '0' });
          set({ promos: [] });
          set({ canSumWithBonuses: '1' });
          set({ canSumWithGifts: '1' });
          get().calculateSum();
        },
        setDecreaseBonus: (value) => {
          set({ decreaseBonus: value });
        },
        setGiftAvailableChecks: (arr) => {
          set({ giftAvailableChecks: arr });
        },
        setGiftLevelPriceArr: (arr) => {
          set({ giftLevelPriceArr: arr });
        },
        setPotentialRecsIds: (arr) => {
          set({ potentialRecsIds: arr });
        },
        setGiftType: (value) => {
          set({ giftsType: value });
        },
        setDeliveryPrice: (value) => {
          set({ deliveryPrice: value });
        },
        clearCart: () => {
          set({
            ordersCount: 0,
            orderSum: 0,
            freeAdditives: 0,
            bonusPercent: 0,
            orders: [],
            gifts: [],
            recommendations: [],
            additives: get().additives.map((item) => {
              return { ...item, countInCart: 0, disabled: false };
            }),
            cutlery: get().cutlery.map((item) => {
              return { ...item, countInCart: 0, disabled: false };
            }),
            potentialRecsIds: [],
          });
          get().removePromocode();
        },
      }),
      { name: 'cartStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);
