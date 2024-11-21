import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FullFormField } from '@/entities/form-field';
import { useSendContactEmail } from '@/feature/form-callback/model/use-send-contact-email';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export type FormType = z.infer<typeof formSchema>;

export const FormCallback = () => {
  const { mutate } = useSendContactEmail();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        className={'mb-10 mt-6 space-y-6 sm:mt-6 md:mb-0'}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FullFormField label={'Имя'} name={'name'} />
        <FullFormField label={'Мобильный телефон'} name={'phone'} type={'tel'} />

        <Button className={'!mt-10 w-full'} disabled={!form.formState.isValid}>
          Отправить
        </Button>
      </form>
    </Form>
  );
};
