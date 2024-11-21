'use client';

import React, { useEffect } from 'react';

import { YMaps, Map, Polygon } from '@pbe/react-yandex-maps';

import { useGetAllOrganizations } from '../restaurants/rest-lists/model/use-get-all-organizations';

import { CenterPlacemark } from './ui/center-placemark';
import { useYandexMap } from './use-yandex-map';

import { MapControls } from '@/feature/map-controls';
import { MAP_DEFAULT } from '@/shared/const/map';
import { useGetOrgPolygon } from '@/shared/hooks/query/use-get-org-polygon';
import { useAddress } from '@/shared/state/address';
import { type StepFormType, useDelivery } from '@/shared/state/delivery';
import { DeliveryLists } from '@/widgets/yandex-map/ui/delivery-lists';
import { PickupPointLists } from '@/widgets/yandex-map/ui/pickup-point-lists';
import { RestLists } from '@/widgets/yandex-map/ui/rest-lists';
interface YandexMapProperties {
  zoom?: number;
  defaultStep?: StepFormType;
}

const YandexMap = ({ zoom, defaultStep }: YandexMapProperties) => {
  const { address } = useAddress();
  const { step } = useDelivery();
  const { setMap, map, isMove, setCenter } = useYandexMap();
  const selectStep = defaultStep ?? step;
  const { data: orgs } = useGetAllOrganizations();

  const { data, refetch } = useGetOrgPolygon(
    Number(address?.LastAddressOrgID ?? orgs?.[0].id),
  );

  useEffect(() => {
    if (address?.LastLat && address?.LastLng && step === 'addAddress') {
      setCenter({
        lat: address?.LastLat,
        lng: address?.LastLng,
      });
    }
  }, [address?.LastLat, address?.LastLng, step]);

  useEffect(() => {
    void refetch();
  }, [address?.LastAddressOrgID, orgs?.[0].id, step]);

  return (
    <YMaps>
      <Map
        className={'relative !h-full'}
        modules={['templateLayoutFactory', 'layout.ImageWithContent']}
        defaultState={{
          center: [
            address?.LastLat ?? MAP_DEFAULT.center[0],
            address?.LastLng ?? MAP_DEFAULT.center[1],
          ],
          zoom: zoom ?? MAP_DEFAULT.zoom,
        }}
        options={{}}
        instanceRef={setMap}
        height='100%'
        width='100%'
        style={{ width: '100&', height: '100%' }}
      >
        {data &&
          (step === 'addAddress' || step === 'delivery' || step === 'rest') &&
          Object.values(data)?.map((item, key) => {
            return (
              <Polygon
                key={key}
                geometry={[item.pos]}
                options={{
                  fillColor: `${item.color + '70'}`,
                  strokeColor: item.color,
                  opacity: 0.5,
                  strokeWidth: 1,
                }}
              />
            );
          })}

        {/* <Placemark geometry={[test.lat, test.lng]} /> */}
        <MapControls
          map={map}
          className={'right-4 top-32 md:bottom-[70px] md:top-auto'}
        />
        {selectStep === 'addAddress' && <CenterPlacemark isMove={isMove} />}
        {(selectStep === 'pickup' || selectStep === 'booking') && (
          <PickupPointLists map={map} />
        )}
        {selectStep === 'delivery' && <DeliveryLists map={map} />}
        {selectStep === 'rest' && <RestLists map={map} />}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
