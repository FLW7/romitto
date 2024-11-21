import type ymaps from 'yandex-maps';

import { ButtonMap } from './ui/button-map';

import MinusIcon from '@/assets/icons/minus.svg';
import NavigateIcon from '@/assets/icons/navigate.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { cn } from '@/shared/lib/utils';

interface Properties {
  map?: ymaps.Map | null;
  className?: string;
}
export const MapControls = ({ map, className }: Properties) => {
  const changeZoom = (index: number) => {
    if (map) {
      void map?.setZoom(index ? map?.getZoom() + 1 : map?.getZoom() - 1);
    }
  };

  const handleGetPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        void map?.panTo([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  };

  return (
    <div className={cn(className, 'absolute z-10 flex w-fit flex-col gap-3')}>
      {[1, 0].map((id) => (
        <ButtonMap
          key={id}
          onClick={() => {
            changeZoom(id);
          }}
          className='max-md:hidden'
        >
          {id ? <PlusIcon /> : <MinusIcon />}
        </ButtonMap>
      ))}

      <ButtonMap onClick={handleGetPosition} className={'pt-1 md:mt-5'}>
        <NavigateIcon width={24} height={24} />
      </ButtonMap>
    </div>
  );
};
