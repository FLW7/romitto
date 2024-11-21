import { useMutation } from '@tanstack/react-query';

import { getOrganisationByCoordinates } from '@/feature/form-add-address/api';
import { type ISetError, type ISetValue } from '@/shared/type/form';
import { type ILocation } from '@/shared/type/map';
interface Props {
  setError: ISetError;
  setValue: ISetValue;
  setIsPolygon: (value: boolean) => void;
}
export const useGetOrganisationMutate = ({ setError, setValue, setIsPolygon }: Props) => {
  return useMutation({
    mutationFn: async (location: ILocation) =>
      await getOrganisationByCoordinates(location),
    onSuccess: (data) => {
      setIsPolygon(data.success);
      if (data.success) {
        setValue('organisationID', Number(data.polygons[0].organisationID));
        setValue('polygonID', Number(data.polygons[0].polygonID));
      } else {
        setError('address', {
          type: 'custom',
          message: data.text,
        });
      }
    },
  });
};
