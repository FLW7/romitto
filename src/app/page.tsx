'use client';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import CatalogSkeleton from '@/entities/catalog-skeleton/catalog-skeleton';
import { QUERY_KEY } from '@/shared/const/query-key';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import useFillCart from '@/shared/hooks/use-fill-cart';
import { FilterGiftLevelArr } from '@/shared/lib/filter-gifts';
import { useAddress } from '@/shared/state/address';
import { type TCartGiftItem } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';
import { StoriesDynamic } from '@/widgets/modal/stories/stories.dynamic';
import WrapperMenu from '@/widgets/wrapper-menu/wrapper-menu';

const Menu = () => {
  const client = useQueryClient();

  const { gifts, setGiftAvailableChecks, setAvailableGifts, setGiftLevelPriceArr } =
    useCart();
  const { address } = useAddress();

  const { data } = useGetCatalog();

  useFillCart();

  useEffect(() => {
    if (address.LastPolygonID) {
      void client.refetchQueries({ queryKey: QUERY_KEY.minDeliveryPrice });
    }
  }, [address.LastPolygonID]);

  useEffect(() => {
    if (data) {
      data.gift &&
        setAvailableGifts(
          data?.gift
            ?.filter(
              (item) =>
                String(item.delivery_type) === String(address.LastAddressType) ||
                String(item.delivery_type) === '3',
            )
            .sort((a: TCartGiftItem, b: TCartGiftItem) => a.minPrice - b.minPrice),
        );

      setGiftLevelPriceArr(
        data?.gift
          ?.filter(
            (item) =>
              String(item.delivery_type) === String(address.LastAddressType) ||
              String(item.delivery_type) === '3',
          )
          ?.map((item: TCartGiftItem) => item.minPrice)
          ?.sort((a: number, b: number) => a - b),
      );

      setGiftAvailableChecks([
        ...new Set(
          FilterGiftLevelArr(
            data?.gift?.filter(
              (item) =>
                String(item.delivery_type) === String(address.LastAddressType) ||
                String(item.delivery_type) === '3',
            ),
            gifts,
          ),
        ),
      ]);
    }
  }, [address.LastAddressType, data, gifts]);

  if (!data) {
    return (
      <div className='mx-auto w-full max-w-[1304px]'>
        <CatalogSkeleton />
      </div>
    );
  }

  return (
    <>
      <WrapperMenu />
      {/* {isDesktop && delivery?.addGift === 1 && <GiftAvaliableDynamic />} */}
      <StoriesDynamic />
    </>
  );
};

export default Menu;
