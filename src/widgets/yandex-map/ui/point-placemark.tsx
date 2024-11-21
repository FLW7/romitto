import React from 'react';

import { Placemark, useYMaps } from '@pbe/react-yandex-maps';

import { DeliveryIconStr, PickupIconStr } from '@/widgets/yandex-map/ui/logo-str';
interface CafePointPlacemarkProps {
  id: string;
  lattitude: string;
  longitude: string;
  isActive: boolean;
  onClick: (id: string) => void;
  variant: 'delivery' | 'pickup';
}
export const PointPlacemark = ({
  id,
  longitude,
  lattitude,
  onClick,
  isActive,
  variant,
}: CafePointPlacemarkProps) => {
  const ymaps = useYMaps();

  const handleClick = () => {
    onClick(id);
  };
  const MyIconContentLayout = ymaps?.templateLayoutFactory.createClass(
    `
      <button class="${variant === 'delivery' ? 'delivery_point' : 'cafe_point'} ${isActive ? 'active' : ''}" data-id="${id}"  id="placemark-${id}" >
      ${variant === 'pickup' ? PickupIconStr : DeliveryIconStr}
      </button>
    `,

    {
      build: function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        MyIconContentLayout.superclass.build.call(this);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const myMap = this.getData().geoObject;

        myMap.events.add('click', handleClick);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.getData().options.set('shape', {
          coordinates: [
            [-34, -60],
            [34, 10],
          ],
          type: 'Rectangle',
        });
      },
    },
  );

  return (
    <Placemark
      options={{
        cursor: 'pointer',
        iconLayout: MyIconContentLayout,

        preset: 'default#imageWithContent',
        iconImageSize: [48, 48],

        iconImageOffset: [-24, -24],
        iconContentOffset: [15, 15],
        zIndex: isActive ? 100 : 30,
      }}
      geometry={[lattitude, longitude]}
    />
  );
};
