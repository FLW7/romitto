import type ymaps from 'yandex-maps';

import { useGetMyAddress } from '@/feature/form-modal-choose-my-address/model/use-get-my-address';
import { useActivePlaceId } from '@/feature/form-modal-choose-pickup/state/use-active-place-id';
import { useSetActiveElCenter } from '@/widgets/yandex-map/model/use-set-active-el-center';
import { PointPlacemark } from '@/widgets/yandex-map/ui/point-placemark';
interface CafePointListsProps {
  map?: ymaps.Map | null;
}
export const DeliveryLists = ({ map }: CafePointListsProps) => {
  const { data } = useGetMyAddress();
  const { setActiveEl } = useSetActiveElCenter({ data, isMap: true });

  const { activeId } = useActivePlaceId();

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
          onClick={setActiveEl}
        />
      ))}
    </div>
  );
};
