import { type Dispatch, type SetStateAction, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useSendOrderCode } from './model/use-send-order-code';

import { FieldInputOtp } from '@/entities/field-Input-otp';
import { Agreement } from '@/feature/form-login-phone/el/agreement';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { useToast } from '@/shared/components/use-toast';
import { getHash } from '@/shared/lib/hash';
import { useTimerStore } from '@/shared/state/timer';

const formSchema = z.object({
  code: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

export const FormOrderCode: React.FC<{
  phone: string;
  setCode: Dispatch<SetStateAction<string | undefined>>;
  openConfirmPopup: () => void;
}> = ({ phone, setCode, openConfirmPopup }) => {
  const { seconds, setSeconds } = useTimerStore();
  const { toast } = useToast();
  const sendCode = useSendOrderCode();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });
  const sendPhone = useSendOrderCode();
  const { handleSubmit, formState, watch } = form;

  const codeWatch = watch('code');

  const { hashValue, temp, clearNumbers } = getHash(phone);

  const resendPhone = async () => {
    await sendPhone.mutateAsync({ hashValue, temp, clearNumbers }).then(() => {
      setSeconds(30);
      toast({ title: 'Код отправлен' });
    });
  };

  const onSubmit = ({ code }: FormType) => {
    if (code?.length === 4) {
      setCode(code);
      openConfirmPopup();
    }
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
    clearNumbers && sendCode.mutate({ hashValue, temp, clearNumbers });

    setSeconds(30);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h5'} className={'mb-3 text-center'}>
          Введите код
        </Typography>
        <div className={'mb-8 flex flex-col items-center '}>
          <Typography variant={'desc'} className={'text-center text-secondary'}>
            Мы отправили код с сообщением на
          </Typography>

          <Typography className={'text-center font-semibold'} variant={'p2'}>
            {phone}
          </Typography>
        </div>

        <div className={'center'}>
          <FieldInputOtp name={'code'} />
        </div>

        {seconds <= 0 ? (
          <div className={'center mt-10'}>
            <Button
              type='button'
              onClick={resendPhone}
              variant={'link'}
              className={'!p-0'}
            >
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
