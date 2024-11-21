'use client';

import * as React from 'react';

import { z } from 'zod';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import InputAddress from '@/feature/input-address/input-address';
import { Sheet, SheetContent } from '@/shared/components/sheet';
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
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  mutate: (value: ILocation) => void;
}
const InputAddressModal = ({ isActive, setIsActive, mutate }: Props) => {
  const handleBack = () => {
    setIsActive(false);
  };

  return (
    <Sheet open={isActive}>
      <SheetContent side={'right'} hideCloseButton>
        <div className={'flex items-start gap-4 '}>
          <button type={'button'} onClick={handleBack} className={'h-[44px]'}>
            <ArrowLeftIcon className={'h-4 w-4 fill-secondary'} />
          </button>
          <InputAddress mutate={mutate} setIsActive={setIsActive} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InputAddressModal;
