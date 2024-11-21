'use client';

import * as React from 'react';

import { ChevronLeft } from 'lucide-react';
import { z } from 'zod';

import InputAddress from '@/feature/input-address/input-address';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import Typography from '@/shared/components/typography';
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
      <SheetContent side={'right'} hideCloseButton className='bg-bgMain'>
        <div>
          <div className='mb-6 flex items-center gap-[6px]'>
            <button type={'button'} onClick={handleBack} className={'h-[44px]'}>
              <ChevronLeft size={24} className='stroke-primary' />
            </button>
            <Typography variant='desc' className='text-lg font-semibold'>
              Укажите адрес доставки
            </Typography>
          </div>
          <InputAddress mutate={mutate} setIsActive={setIsActive} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InputAddressModal;
