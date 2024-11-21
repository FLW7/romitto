import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { FullFormField } from '@/entities/form-field';
import { CONFIG } from '@/feature/form-register/config';
import { calculateAge, formatDate } from '@/feature/form-register/lib';
import { useCreateAccount } from '@/feature/form-register/model/use-create-account';
import { type ICreateAccountRequest } from '@/feature/form-register/type';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';
import { DataPicker } from '@/widgets/data-picker';

const formSchema = z.object({
  birthdate: z.date(),
  phone: z.string().min(1, {
    message: 'Введите телефон',
  }),
  firstName: z.string(),
  lastName: z.string().optional(),
  referalCode: z.string().optional(),
  email: z.string().email('Неверная почта').optional(),
  // gender: z.union([z.literal('M'), z.literal('F')]),
});

type FormType = z.infer<typeof formSchema>;

enum StepEn {
  INFO,
  BIRTHDAY,
}

export const FormRegister = () => {
  const { onClose, data } = useModal();
  const { mutate } = useCreateAccount({ phone: data?.phone ?? '' });
  const [step, setStep] = useState(StepEn.INFO);
  const isInfo = step === StepEn.INFO;

  const form = useForm<FormType>({
    defaultValues: {
      phone: data?.phone ?? '',
      // gender: 'M',
      birthdate: new Date(),
    },
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit, formState } = form;

  const changeStep = (step: StepEn) => {
    setStep(step);
  };

  const onSubmit = ({
    birthdate,
    // gender,
    firstName,
    lastName,
    email,
    phone,
  }: FormType) => {
    if (isInfo) {
      changeStep(StepEn.BIRTHDAY);
    } else {
      const dto: ICreateAccountRequest = {
        Web: '1',
        // Gender: gender,
        Name: (firstName + ' ' + (lastName ?? '')).trim(),
        Birthday: formatDate(birthdate),
        Email: email ?? '',
        Phone: phone,
        ReferalCode: '',
      };

      mutate(dto);

      changeStep(StepEn.BIRTHDAY);
    }
  };

  const isError = Object.keys(formState.errors)?.length > 0;

  useEffect(() => {
    if (isError && !formState.errors?.birthdate) {
      changeStep(StepEn.INFO);
    }
  }, [isError]);

  return (
    <Form {...form}>
      <button
        className={'absolute left-4 top-9 p-4  outline-none'}
        onClick={() => {
          isInfo ? onClose() : changeStep(StepEn.INFO);
        }}
      >
        <ArrowLeftIcon />
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className={'space-y-7'}>
        <div>
          <Typography variant={'h5'} className={' mb-3 text-center'}>
            {isInfo ? CONFIG.title : CONFIG.titleBirthday}
          </Typography>

          <Typography variant={'p2'} className={'text-center text-secondary'}>
            {isInfo ? CONFIG.desc : CONFIG.descFinish}
          </Typography>
        </div>
        {isInfo ? (
          <>
            <div className={'space-y-3'}>
              <FullFormField
                label={'Имя *'}
                name={'firstName'}
                // error={formState.errors?.firstName?.message}
              />
              <FullFormField
                label={'Фамилия'}
                name={'lastName'}
                // error={formState.errors?.lastName?.message}
              />
              <FullFormField
                label={'Эл. почта'}
                name={'email'}
                // error={formState.errors?.email?.message}
              />
            </div>

            {/* <div className={'flex gap-8'}>
              <Typography variant={'p2'}>Вы:*</Typography>

              <Controller
                render={({ field }) => (
                  <RadioGroup
                    className={'gap-5'}
                    {...field}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {GENDER_LIST.map(({ id, title, name }) => (
                      <div className='flex  items-center space-x-3' key={id}>
                        <RadioGroupItem
                          variant={'square'}
                          value={name}
                          id={name}
                          className={'h-7 w-7 rounded-full'}
                        />
                        <Label htmlFor={name}>{title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                name={'gender'}
                control={control}
              />
            </div> */}

            <Typography variant={'p'} className={'text-secondary'}>
              {CONFIG.required}
            </Typography>

            <Button type={'submit'} className={'w-full'}>
              Продолжить
            </Button>
          </>
        ) : (
          <Controller
            render={({ field }) => (
              <div className={'!mt-12'}>
                <DataPicker
                  date={field.value}
                  onDateChange={(newDate) => {
                    field.onChange(newDate);
                  }}
                />
                <div className={' mb-2 mt-8 space-y-3'}>
                  <Typography variant={'desc'} className={'text-center  text-secondary'}>
                    {CONFIG.scroll}
                  </Typography>

                  <Typography variant={'p2'} className={'text-center font-semibold'}>
                    Вам {calculateAge(field.value)} лет
                  </Typography>
                </div>

                <Button className={'mt-7 w-full'}>Продолжить</Button>
              </div>
            )}
            name={'birthdate'}
          />
        )}
      </form>
    </Form>
  );
};
