import { useEffect } from 'react';

import { FilterGiftLevelArr } from '../lib/filter-gifts';

import { useGetCatalog } from './query/use-get-catalog';

import { type TCartGiftItem } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

const useFillCart = () => {
  const {
    gifts,
    setCutleries,
    setAdditives,
    setAdditionalTable,
    setAvailableGifts,
    setGiftLevelPriceArr,
    setGiftAvailableChecks,
    calculateSum,
    orders,
    setPlates,
    plates,
  } = useCart();

  const { data, isSuccess } = useGetCatalog();

  useEffect(() => {
    if (data && isSuccess) {
      data.cutlery && setCutleries(data.cutlery);
      data.additions && setAdditives(data.additions);
      data.additionsTable && setAdditionalTable(data.additionsTable);
      data.gift &&
        setAvailableGifts(
          data.gift.sort((a: TCartGiftItem, b: TCartGiftItem) => a.minPrice - b.minPrice),
        );

      setGiftLevelPriceArr(
        data.gift
          ?.map((item: TCartGiftItem) => item.minPrice)
          ?.sort((a: number, b: number) => a - b),
      );

      if (orders?.length === 0) {
        setGiftAvailableChecks([...new Set(FilterGiftLevelArr(data.gift, gifts))]);
      }

      //   data?.potentialRecomendations &&
      //     setPotentialRecsIds(
      //       data?.potentialRecomendations.map(
      //         (item: { PlateID: string; Priority: string }) =>
      //           Number.parseInt(item.PlateID),
      //       ),
      //     );

      if (plates?.length === 0) {
        setPlates(data?.plates);
      }

      calculateSum();
    }
  }, [isSuccess]);

  return true;
};

export default useFillCart;
