import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FullFormField } from '@/entities/form-field';
import { LoginConfig } from '@/feature/form-login-phone/config';
import { useSendPhone } from '@/feature/form-login-phone/model/use-send-phone';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { getHash } from '@/shared/lib/hash';

const formSchema = z.object({
  phone: z.string().min(1, {
    message: 'Введите телефон',
  }),
});

type FormType = z.infer<typeof formSchema>;

export const FormLoginPhone = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const sendPhone = useSendPhone({ getValue: form.getValues });
  const { handleSubmit, formState } = form;

  const onSubmit = ({ phone }: FormType) => {
    const { hashValue, temp, clearNumbers } = getHash(phone);

    clearNumbers &&
      sendPhone.mutate({ Phone: '+' + clearNumbers, hash: hashValue, temp });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h5'} className={'mb-3 text-center'}>
          {LoginConfig.title}
        </Typography>
        <div className={'mb-8'}>
          <Typography variant={'desc'} className={'text-center text-secondary'}>
            {LoginConfig.desc}
          </Typography>
        </div>

        <FullFormField label={'Мобильный телефон'} name={'phone'} type={'tel'} />

        <Button className={'mt-8 w-full'} disabled={!formState.isValid}>
          Продолжить
        </Button>
      </form>
    </Form>
  );
};
