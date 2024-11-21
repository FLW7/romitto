import { useEffect } from 'react';

import { useActivePlaceId } from '@/feature/form-modal-choose-pickup/state/use-active-place-id';
import { useAddress } from '@/shared/state/address';
import { useDelivery } from '@/shared/state/delivery';
import { useMap } from '@/shared/state/map';
interface Props {
  data?: any[];
  isMap: boolean;
}

export const useSetActiveElCenter = ({ data, isMap }: Props) => {
  const { step } = useDelivery();
  const { address } = useAddress();
  const { map } = useMap();
  const { setActiveId, activeId } = useActivePlaceId();

  const setActiveEl = (id: string) => {
    if (!map) return;

    setActiveId(id);
    const place = data?.find((el) => el.id === id);

    // setCenter({ lat: Number(place?.lattitude), lng: Number(place?.longitude) });

    void map?.panTo([Number(place?.lattitude), Number(place?.longitude)]);
  };

  useEffect(() => {
    if (data?.length && map && isMap) {
      void map?.setZoom(12);

      const activeEl = data.find((el) => el.id === activeId);

      const el = activeEl ?? data[0];

      // setCenter({ lat: Number(el?.lattitude), lng: Number(el.longitude) });
      void map?.setCenter([Number(el.lattitude), Number(el.longitude)]);
    }
  }, [data, map, activeId]);

  useEffect(() => {
    if (
      step === 'pickup' &&
      !!address?.LastAddressOrgID &&
      address?.LastAddressOrgID !== 0
    ) {
      setActiveId(address.LastAddressOrgID.toString());
    }

    if (step === 'delivery' && !!address?.LastAddressID && address?.LastAddressID !== 0) {
      setActiveId(address.LastAddressID.toString());
    }
  }, [address?.LastAddressID, address?.LastAddressOrgID]);

  return { setActiveEl };
};
