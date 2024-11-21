import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FieldInputOtp } from '@/entities/field-Input-otp';
import { LoginConfig } from '@/feature/form-login-phone/config';
import { Agreement } from '@/feature/form-login-phone/el/agreement';
import { useSendCode } from '@/feature/form-login-phone/model/use-send-code';
import { useSendPhone } from '@/feature/form-login-phone/model/use-send-phone';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { useToast } from '@/shared/components/use-toast';
import { getHash } from '@/shared/lib/hash';
import { getOnlyNumbers, phoneMask } from '@/shared/lib/phone-mask';
import { useModal } from '@/shared/state/modal';
import { useTimerStore } from '@/shared/state/timer';

const formSchema = z.object({
  phone: z.string().min(1, {
    message: 'Введите телефон',
  }),
  code: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

export const FormLoginCode = () => {
  const { seconds, setSeconds } = useTimerStore();
  const { toast } = useToast();

  const { onOpen, data } = useModal();
  const sendCode = useSendCode();

  const form = useForm<FormType>({
    defaultValues: {
      phone: data?.phone || '',
    },
    resolver: zodResolver(formSchema),
  });
  const sendPhone = useSendPhone({ getValue: form.getValues });
  const { handleSubmit, formState, getValues, watch } = form;

  const codeWatch = watch('code');

  const changePhone = () => {
    onOpen('login');
  };

  const resendPhone = async () => {
    const { hashValue, temp, clearNumbers } = getHash(getValues('phone'));

    await sendPhone
      .mutateAsync({
        Phone: `+${clearNumbers}`,
        hash: hashValue,
        temp,
      })
      .then(() => {
        setSeconds(30);
        toast({ title: 'Код отправлен', variant: 'success' });
      });
  };

  const onSubmit = ({ phone, code }: FormType) => {
    const clearNumbers = getOnlyNumbers(phone);

    code && clearNumbers && sendCode.mutate({ Phone: clearNumbers, Code: code });
  };

  useEffect(() => {
    if ((codeWatch?.length ?? 0) === 4) {
      try {
        void handleSubmit(onSubmit)();
      } catch (error) {
        console.error(error);
      }
    }
  }, [codeWatch]);

  useEffect(() => {
    data?.isRegister && resendPhone();
    setSeconds(30);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h5'} className={'mb-3 text-center'}>
          {LoginConfig.titleCode}
        </Typography>
        <div className={'mb-8 flex flex-col items-center '}>
          <Typography variant={'desc'} className={'text-center text-secondary'}>
            {LoginConfig.descCode}
          </Typography>

          <Typography className={'text-center font-semibold'} variant={'p2'}>
            {phoneMask(getValues('phone'))}
          </Typography>
          <Button variant={'link'} onClick={changePhone} className={'p-0'}>
            Изменить
          </Button>
        </div>

        <div className={'center'}>
          <FieldInputOtp name={'code'} />
        </div>

        {seconds <= 0 ? (
          <div className={'center mt-10'}>
            <Button onClick={resendPhone} variant={'link'} className={'!p-0'}>
              <Typography variant={'p2'}>Отправить код повторно</Typography>
            </Button>
          </div>
        ) : (
          <Typography variant={'p2'} className={'mt-8 text-center text-secondary'}>
            Повторный код через: <span className={'inline-block min-w-6'}>{seconds}</span>
          </Typography>
        )}

        <Button
          className={'mt-8 w-full'}
          disabled={!formState.isValid || (codeWatch?.length ?? 0) < 4}
        >
          Продолжить
        </Button>

        <Agreement />
      </form>
    </Form>
  );
};
