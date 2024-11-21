import React from 'react';

import PlacemarkIcon from '@/assets/icons/placemark.svg';
import { cn } from '@/shared/lib/utils';
interface CenterPlacemarkProperties {
  isMove: boolean;
}
export const CenterPlacemark = ({ isMove }: CenterPlacemarkProperties) => {
  return (
    <div
      className={
        'pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-full'
      }
    >
      <span className={cn('placemark_marker', isMove && 'isMove')}>
        <PlacemarkIcon
          width={25}
          height={45}
          style={{
            transform: isMove ? 'translateY(-15px)' : 'translateY(0)',
            transition: 'all .3s ease',
          }}
        />
      </span>
    </div>
  );
};
