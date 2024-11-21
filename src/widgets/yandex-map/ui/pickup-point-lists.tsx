import type ymaps from 'yandex-maps';

import { useGetOrganisation } from '@/feature/form-modal-choose-pickup/model/use-get-organisation';
import { useActivePlaceId } from '@/feature/form-modal-choose-pickup/state/use-active-place-id';
import { useSetActiveElCenter } from '@/widgets/yandex-map/model/use-set-active-el-center';
import { PointPlacemark } from '@/widgets/yandex-map/ui/point-placemark';

interface CafePointListsProps {
  map?: ymaps.Map | null;
}
export const PickupPointLists = ({ map }: CafePointListsProps) => {
  const { data } = useGetOrganisation();
  const { setActiveEl } = useSetActiveElCenter({ data, isMap: true });

  const { activeId } = useActivePlaceId();

  return (
    <div>
      {data?.map((place) => (
        <PointPlacemark
          variant={'pickup'}
          key={place.id}
          id={place.id}
          lattitude={place.lattitude}
          longitude={place.longitude}
          isActive={activeId === place.id}
          onClick={setActiveEl}
        />
      ))}
    </div>
  );
};
