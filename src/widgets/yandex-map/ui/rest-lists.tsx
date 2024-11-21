import React, { useEffect } from 'react';

import type ymaps from 'yandex-maps';

import { useActivePlaceId } from '@/feature/form-modal-choose-pickup/state/use-active-place-id';
import { useGetAllOrganizations } from '@/widgets/restaurants/rest-lists/model/use-get-all-organizations';
import { PointPlacemark } from '@/widgets/yandex-map/ui/point-placemark';
interface CafePointListsProps {
  map?: ymaps.Map | null;
}
export const RestLists = ({ map }: CafePointListsProps) => {
  const { data } = useGetAllOrganizations();
  const { activeId, setActiveId } = useActivePlaceId();

  const handleClick = (id: string) => {
    setActiveId(id);
    const place = data?.find((el) => el.id === id);

    void map?.panTo([Number(place?.lattitude), Number(place?.longitude)]);
  };

  useEffect(() => {
    if (data?.length && map) {
      void map?.setCenter([Number(data[0].lattitude), Number(data[0].longitude)]);
    }
  }, [data, map]);

  return (
    <div>
      {data?.map((address) => (
        <PointPlacemark
          variant={'delivery'}
          key={address.id}
          longitude={address.longitude}
          lattitude={address.lattitude}
          id={address.id}
          isActive={activeId === address.id}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};
