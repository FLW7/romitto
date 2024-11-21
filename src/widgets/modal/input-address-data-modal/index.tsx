'use client';

import * as React from 'react';

import { ChevronLeft } from 'lucide-react';
import { z } from 'zod';

import { CheckboxField } from '@/entities/checkbox-field';
import { FullFormField } from '@/entities/form-field';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';

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
  isPrivateHouse: boolean;
  loading: boolean;
  setIsActive: (value: boolean) => void;
  isPolygon: boolean;
  formState: any;
  deleteId?: string;
  onSubmit: () => void;
}
const InputAddressDataModal = ({
  isActive,
  setIsActive,
  isPrivateHouse,
  loading,
  isPolygon,
  formState,
  deleteId,
  onSubmit,
}: Props) => {
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
              Заплонить детали
            </Typography>
          </div>
          <div>
            <CheckboxField
              name={'isPrivateHouse'}
              label={'Частный дом'}
              className={'my-5 text-primary'}
              disabled={loading}
            />
            <div className={'grid grid-cols-2 gap-2 max-sm:pb-10 sm:gap-3'}>
              <FullFormField
                isClear
                disabled={isPrivateHouse || loading}
                label={'Подъезд *'}
                error={formState.errors?.entreance?.message && ''}
                name={'entreance'}
                type='number'
                className='h-[60px]'
              />
              <FullFormField
                isClear
                disabled={isPrivateHouse || loading}
                label={'Код двери'}
                name={'doorNumber'}
                type='number'
                className='h-[60px]'
              />
              <FullFormField
                isClear
                disabled={isPrivateHouse || loading}
                label={'Этаж *'}
                error={formState.errors?.floor?.message && ''}
                name={'floor'}
                type='number'
                className='h-[60px]'
              />
              <FullFormField
                isClear
                disabled={isPrivateHouse || loading}
                label={'Квартира *'}
                error={formState.errors?.apt?.message && ''}
                name={'apt'}
                type='number'
                className='h-[60px]'
              />
              <FullFormField
                isClear
                disabled={loading}
                label={'Комментарий'}
                name={'commentory'}
                fieldClassName={'col-span-2'}
                className='h-[60px]'
              />
            </div>
          </div>
        </div>
        <div className={'fixed bottom-5 left-0 w-full gap-2 px-4 pb-0 pt-3'}>
          <button
            type='submit'
            id={'addAddressButton'}
            onClick={onSubmit}
            className={cn(
              'h-[50px] w-full rounded-full bg-main text-white',
              (loading ||
                !isPolygon ||
                !!formState.errors?.entreance ||
                !!formState.errors?.floor ||
                !!formState.errors?.apt) &&
                'pointer-events-none opacity-50',
            )}
          >
            {deleteId ? 'Изменить' : 'Добавить'}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InputAddressDataModal;
