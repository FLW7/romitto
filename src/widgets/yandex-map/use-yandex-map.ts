import { useEffect, useState } from 'react';

import { useDebounce } from '@/shared/hooks/use-debounce';
import { useDelivery } from '@/shared/state/delivery';
import { useMap } from '@/shared/state/map';

export const useYandexMap = () => {
  const { step } = useDelivery();
  const { setMap, map, setCenter } = useMap();
  const [center, setCenterState] = useState<[number, number]>();
  const [isMove, setIsMove] = useState(false);
  const isAddAddress = step === 'addAddress';
  const debounceSetCenter = useDebounce(center, 900);

  const handleActionBegin = () => {
    setIsMove(true);
  };

  const handleActionEnd = () => {
    setIsMove(false);
    if (map) {
      const newLat = map.getCenter()[0];
      const newLng = map.getCenter()[1];

      setCenterState([newLat, newLng]);
    }
  };

  useEffect(() => {
    if (map && isAddAddress) {
      map.events.add('actionbegin', handleActionBegin);
      map.events.add('actionend', handleActionEnd);

      return () => {
        map.events.remove('actionbegin', handleActionBegin);
        map.events.remove('actionend', handleActionEnd);
      };
    }
  }, [map, isAddAddress]);

  useEffect(() => {
    if (debounceSetCenter && isAddAddress) {
      setCenter({ lat: debounceSetCenter[0], lng: debounceSetCenter[1] });
    }
  }, [debounceSetCenter, isAddAddress]);

  return {
    setMap,
    map,
    isMove,
    setCenter,
  };
};
