'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { CITY_LIST } from '@/feature/form-choose-city/mock';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import { Label } from '@/shared/components/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/radio-group';
import { useModal } from '@/shared/state/modal';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Введите имя',
  }),
});

type FormType = z.infer<typeof formSchema>;
export const FormChooseCity = () => {
  const { onClose } = useModal();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'mb-4 space-y-11 md:mb-0'}>
        <RadioGroup defaultValue='option-one'>
          {CITY_LIST.map(({ id, title, name }) => (
            <div className='flex  items-center space-x-4' key={id}>
              <RadioGroupItem variant='square' value={name} id={name} />
              <Label htmlFor={name}>{title}</Label>
            </div>
          ))}
        </RadioGroup>

        <Button className={' w-full '} onClick={onClose}>
          Выбрать
        </Button>
      </form>
    </Form>
  );
};
