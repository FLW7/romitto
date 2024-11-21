'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { FullFormField } from '@/entities/form-field';
import { Suggests } from '@/feature/form-add-address/el/suggests';
import { useGetPlaceById } from '@/feature/form-add-address/model/use-get-place-by-id';
import { useGetSuggests } from '@/feature/form-add-address/model/use-get-suggests';
import type { IPredictionItem } from '@/feature/form-add-address/type';
import { useDebounce } from '@/shared/hooks/use-debounce';
import type { ILocation } from '@/shared/type/map';

export const FormSchema = z.object({
  address: z.string().min(1, {
    message: 'Введите адресс',
  }),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  lattitude: z.number(),
  longitude: z.number(),
  houseNumber: z.string(),
});

export type FormType = z.infer<typeof FormSchema>;
interface Props {
  setIsActive?: (value: boolean) => void;
  mutate: (value: ILocation) => void;
}
const InputAddress = ({ setIsActive, mutate }: Props) => {
  const suggestsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [inputSearch, setInputSearch] = useState<string>('');
  const debouncedSearchQuery = useDebounce(inputSearch, 1000);
  const [isOpenSuggest, setIsOpenSuggest] = useState(false);

  // TODO Заменить на useQuery
  const getSuggests = useGetSuggests(debouncedSearchQuery);

  const { setValue, formState, clearErrors } = useFormContext();

  const getPlaceById = useGetPlaceById({ mutate, setValue });

  const setSuggest = (value: IPredictionItem) => {
    setValue('address', `${value.structured_formatting.secondary_text}`);
    getPlaceById.mutate(value.place_id);
    setIsOpenSuggest(false);
    setIsActive && setIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestsRef?.current &&
      !suggestsRef?.current.contains(event.target as Node) &&
      inputRef?.current &&
      !inputRef?.current.contains(event.target as Node)
    ) {
      setIsOpenSuggest(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={'relative w-full'}>
      <div ref={inputRef} className={'flex gap-2'}>
        <FullFormField
          isClear
          fieldClassName={'grow'}
          className='!h-16'
          error={formState?.errors?.address?.message as string | undefined}
          isLoading={getSuggests.isLoading || getSuggests.isFetching}
          label={'Город, улица, дом'}
          name={'address'}
          onChange={(event) => {
            setInputSearch(event.target.value);
            !!formState?.errors?.address?.message && clearErrors('address');
          }}
          onFocus={() => {
            setIsOpenSuggest(true);
          }}
        />
      </div>
      {isOpenSuggest && (
        <Suggests
          onClick={setSuggest}
          suggests={getSuggests.data?.predictions}
          ref={suggestsRef}
        />
      )}
    </div>
  );
};

export default InputAddress;
