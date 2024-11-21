'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import ZipIcon from '@/assets/icons/zip.svg';
import { FullFormField } from '@/entities/form-field';
import { PIConfig } from '@/feature/form-personal-information/config';
import convertDateFormat from '@/feature/form-personal-information/lib';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { useGetPrimeHill } from '@/shared/hooks/query/prime-hill';
import { useGetProfile } from '@/shared/hooks/query/profile';
import { phoneMask } from '@/shared/lib/phone-mask';
import { plural } from '@/shared/lib/plural';
import { useModal } from '@/shared/state/modal';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Введите имя',
  }),
  email: z.string().email(),
  phone: z.string(),
  birth: z.string(),
});

type FormType = z.infer<typeof formSchema>;
export const FormPersonalInformation = () => {
  const { data: profile } = useGetProfile();
  const { data: primeHillData } = useGetPrimeHill();

  const { onOpen } = useModal();

  console.log(primeHillData);

  const form = useForm<FormType>({
    values: {
      name: profile?.name ?? '',
      birth: convertDateFormat(profile?.dateOfBirth ?? ''),
      email: profile?.email ?? '',
      phone: phoneMask(profile?.phone ?? ''),
    },
    criteriaMode: 'all',
    resolver: zodResolver(formSchema),
  });

  const logoutHandler = () => {
    onOpen('logout');
  };

  return (
    <Form {...form}>
      <div className={' mb-4 hidden justify-between md:flex'}>
        <Typography variant={'h6'}>{PIConfig.title}</Typography>

        <Button variant={'link'} className={'p-0'} onClick={logoutHandler}>
          Выйти
        </Button>
      </div>
      <form>
        <div className={'space-y-3'}>
          <FullFormField name={'phone'} label={'Номер телефона'} type={'tel'} disabled />
          <FullFormField name={'name'} label={'Имя'} disabled />
          <FullFormField name={'email'} label={'Эл. почта'} type={'email'} disabled />
          <FullFormField name={'birth'} label={'Дата рождения'} disabled />
        </div>
        <div className={'mt-4 flex justify-between '}>
          <div className={'md:max-w-[70%]'}>
            <div className={'flex items-center'}>
              <Typography variant={'h5'} className={'mr-2'}>
                {PIConfig.accumulated}
              </Typography>
              <Typography variant={'h5'} className={'text-main'}>
                {plural(
                  Number(primeHillData?.bonuses) || 0,
                  '%d балл',
                  '%d балла',
                  '%d баллов',
                )}
              </Typography>
              <ZipIcon width={18} height={18} />
            </div>

            <Typography variant={'desc'} className={'text-secondary'}>
              {PIConfig.desc}
            </Typography>
          </div>
        </div>
      </form>
    </Form>
  );
};
