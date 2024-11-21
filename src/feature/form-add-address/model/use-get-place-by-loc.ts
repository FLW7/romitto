import { useMutation } from '@tanstack/react-query';

import { getPlaceByLocation } from '@/feature/form-add-address/api';
import type { ISetValue } from '@/shared/type/form';
import { type ILocation } from '@/shared/type/map';
interface Props {
  mutate: (value: ILocation) => void;
  setValue: ISetValue;
  clearErrors: (name: any) => void;
  errorAddress?: string;
  setError: (name: any, value: any) => void;
}
export const useGetPlaceByLoc = ({
  mutate,
  setValue,
  setError,
  errorAddress,
  clearErrors,
}: Props) => {
  return useMutation({
    mutationFn: async (location: ILocation) => await getPlaceByLocation(location),
    onSuccess: (data) => {
      const value = data.results[0];

      if (!value) {
        setValue('address', '');
        setValue('city', '');
        setValue('country', '');
        setValue('street', '');
        setValue('houseNumber', '');

        setError('address', { message: 'Не доставлям сюда' });

        return;
      }

      const loc = value?.geometry.location;

      mutate(loc);

      setValue('lattitude', Number(loc.lat));
      setValue('longitude', Number(loc.lng));

      !!errorAddress && clearErrors('address');

      const fullStreet =
        value?.address_components.find((el) => el.types[0] === 'route')?.long_name +
        ' ' +
        value?.address_components.find((el) => el.types[0] === 'street_number')
          ?.long_name;

      setValue('address', fullStreet);

      for (const el of value?.address_components) {
        el.types[0] === 'country' && setValue('country', el.long_name);
        el.types[0] === 'route' && setValue('street', el.long_name);
        el.types[0] === 'locality' && setValue('city', el.long_name);
        el.types[0] === 'street_number' && setValue('houseNumber', el.long_name);
      }
    },
  });
};
