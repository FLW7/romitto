import { useMutation } from '@tanstack/react-query';

import { getPlaceByID } from '@/feature/form-add-address/api';
import { useMap } from '@/shared/state/map';
import { type ISetValue } from '@/shared/type/form';
import { type ILocation } from '@/shared/type/map';
interface Props {
  mutate: (value: ILocation) => void;
  setValue: ISetValue;
}
export const useGetPlaceById = ({ mutate, setValue }: Props) => {
  const { map } = useMap();

  return useMutation({
    mutationFn: async (id: string) => await getPlaceByID(id),
    onSuccess: (data) => {
      const loc = data.result.geometry.location;

      void map?.setCenter([loc.lat, loc.lng], 14);

      mutate(loc);

      setValue('lattitude', Number(loc.lat));
      setValue('longitude', Number(loc.lng));

      for (const el of data.result.address_components) {
        el.types[0] === 'country' && setValue('country', el.long_name);
        el.types[0] === 'route' && setValue('street', el.long_name);
        el.types[0] === 'locality' && setValue('city', el.long_name);
        el.types[0] === 'street_number' && setValue('houseNumber', el.long_name);
      }
    },
  });
};
