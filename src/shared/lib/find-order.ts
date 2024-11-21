import {
  type ICartOrderItem,
  type TCartPlateModifiers,
} from '@/widgets/cart-widget/config';

const getMods = (modifiers?: TCartPlateModifiers[]) => {
  return modifiers?.flatMap((item) => item.items.map((subItem) => subItem.id));
};

export const findOrderKey = (
  id: number,
  orders: ICartOrderItem[],
  modifiers?: TCartPlateModifiers[],
  mass?: string,
) => {
  const originMods = getMods(modifiers);

  const newOrders = [...orders];

  for (const [key, item] of newOrders.entries()) {
    const itemMods = item?.modifiers?.flatMap((item) =>
      item.items.map((subItem) => subItem.id),
    );

    if (
      (originMods === undefined || originMods.length === 0) &&
      mass === item.values[0].mass
    ) {
      if (item.id === id && itemMods === undefined) {
        return key;
      }
    } else {
      const sameId = item.id === id;
      const sameLength = itemMods?.length === originMods?.length;
      const sameMods = originMods?.every((item) => itemMods?.includes(item));
      const sameMass = mass === item.values[0].mass;

      if (sameLength && sameMods && sameId && sameMass) {
        return key;
      }
    }
  }

  return null;
};

export const findOrder = (
  id: number,
  orders: ICartOrderItem[],
  modifiers?: TCartPlateModifiers[],
  mass?: string,
) => {
  const originMods = getMods(modifiers);

  const newOrders = [...orders];

  for (const [key, item] of newOrders.entries()) {
    const itemMods = item?.modifiers?.flatMap((item) =>
      item.items.map((subItem) => subItem.id),
    );

    if (key === 1000) {
      console.log(1);
    }

    if (
      (originMods === undefined || originMods.length === 0) &&
      mass === item.values[0].mass
    ) {
      if (Number(item.id) === Number(id) && itemMods === undefined) {
        return item;
      }
    } else {
      const sameId = Number(item.id) === Number(id);
      const sameLength = itemMods?.length === originMods?.length;
      const sameMods = originMods?.every((item) => itemMods?.includes(item));
      const sameMass = mass === item.values[0].mass;

      if (sameLength && sameMods && sameId && sameMass) {
        return item;
      }
    }
  }

  return null;
};
