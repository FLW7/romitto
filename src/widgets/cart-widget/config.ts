import { z } from 'zod';

const schemaCartOrderValues = z.object({
  id: z.string(),
  mass: z.string(),
  price: z.string(),
  salePrice: z.string(),
});

const schemaCartOrderSizes = z.object({
  id: z.string(),
  size: z.string(),
  plateID: z.string(),
  mass: z.string(),
  price: z.string(),
  salePrice: z.string(),
  name: z.string(),
  composition: z.string(),
});

export const schemaPlateModificatorModifer = z.object({
  id: z.number(),
  name: z.string(),
  pictureUrl: z.string(),
  price: z.number(),
  minAmount: z.string(),
  maxAmount: z.string(),
  defaultAmount: z.string(),
  freeAmount: z.string(),
  count: z.number().optional(),
});

export const schemaPlateModificator = z.object({
  id: z.number(),
  title: z.string(),
  type: z.number(),
  isRequired: z.number(),
  modifiers: z.array(schemaPlateModificatorModifer),
  minAmount: z.string(),
  maxAmount: z.string(),
  defaultAmount: z.string(),
  freeAmount: z.string(),
  counts: z.number().optional(),
});

const schemaPlateModifiers = z.object({
  id: z.number(),
  title: z.string(),
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      count: z.number().optional(),
    }),
  ),
  counts: z.number().optional(),
});

export type TCartPlateModifiers = z.infer<typeof schemaPlateModifiers>;
export type TCartItemModifiers = z.infer<typeof schemaPlateModificatorModifer>;

export const schemaCartOrderItem = z.object({
  id: z.number(),
  is_only_for_stories: z.number(),
  descriptionModificator: z.string().optional(),
  itemOrder: z.number(),
  parentID: z.number(),
  categoryID: z.number(),
  isSubCategory: z.number(),
  IsPartPizza: z.number(),
  maxCount: z.number(),
  countInCart: z.number().optional(),
  countAdditions: z.number().optional(),
  name: z.string(),
  values: z.array(schemaCartOrderValues),
  sizes: z.array(schemaCartOrderSizes),
  thumbnailPicture: z.string(),
  isHit: z.number(),
  isNew: z.number(),
  isSpicy: z.number(),
  isSeason: z.number(),
  composition: z.string(),
  calories: z.number(),
  carbohydrates: z.number(),
  fats: z.number(),
  proteins: z.number(),
  pictures: z.array(z.string()).optional(),
  recomendations: z.array(z.string()),
  allergenes: z.array(z.string()),
  comment: z.string().optional(),
  modifiers: z.array(schemaPlateModifiers).optional(),
  modifierBundles: z.array(schemaPlateModificator).optional(),
  tags: z.array(z.string()).optional(),
  price: z.number().optional(),
  canHaveSale: z.string(),
  useSizesDropdown: z.string(),
});

export const schemaCartRecCard = schemaCartOrderItem.omit({ countInCart: true });

export const shcemaCartGiftItem = z.object({
  id: z.number(),
  minPrice: z.number(),
  name: z.string(),
  picture: z.string().optional(),
  weight: z.number(),
  delivery_type: z.number(),
  type: z.number().optional(),
});

export const schemaAdditiveItem = z.object({
  id: z.number(),
  name: z.string(),
  countInCart: z.number().optional(),
  maxCount: z.number(),
  disabled: z.boolean().optional(),
  price: z.number().optional(),
});

type ICartOrderItem = z.infer<typeof schemaCartOrderItem>;

type TCartRecCard = z.infer<typeof schemaCartRecCard>;

type TCartGiftItem = z.infer<typeof shcemaCartGiftItem>;

type TAdditiveItem = z.infer<typeof schemaAdditiveItem>;

interface ICartData {
  ordersCount: number;
  orderSum: number;
  deliverySum: number;
  orders: ICartOrderItem[];
  gifts: TCartGiftItem[];
  availableGifts: TCartGiftItem[];
  recommendations: TCartRecCard[];
  additives: TAdditiveItem[];
  cutlery: TAdditiveItem[];
}

export type { ICartOrderItem, TCartRecCard, ICartData, TCartGiftItem, TAdditiveItem };
