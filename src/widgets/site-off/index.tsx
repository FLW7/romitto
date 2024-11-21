'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import LogoIcon from '@/assets/icons/logo.svg';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg';
import { FullFormField } from '@/entities/form-field';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { useGetSiteAccessibilityMutation } from '@/shared/hooks/query/use-get-site-accessibility';
import type { ISiteAccessibility } from '@/shared/state/site-accessibility';

type Props = Partial<ISiteAccessibility> & {
  setIsOff: (value: boolean) => void;
};

const formSchema = z.object({
  code: z.string(),
});

type FormType = z.infer<typeof formSchema>;

export const SiteOff = (props: Props) => {
  const { mutate } = useGetSiteAccessibilityMutation({ setIsOff: props.setIsOff });
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = ({ code }: FormType) => {
    mutate({ code });
  };

  return (
    <div className={'center h-[100vh] w-full'}>
      <Form {...form}>
        <form
          className={'flex flex-col items-center space-y-10 px-4 sm:p-0'}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <LogoIcon className={'h-[70px] w-[130px]'} />

          <div className={'flex flex-col items-center gap-3 text-center'}>
            <Typography variant={'h1'}>{props?.ru?.titile}</Typography>
            <Typography variant={'p'} className={'text-secondary'}>
              {props?.ru?.descr}
            </Typography>
          </div>

          <FullFormField label={'Code'} name={'code'} />
          <Button className={'w-[300px]'}>Войти</Button>

          <div className={'mt-4 flex flex-col'}>
            <Link
              href={'https://wa.me/message/HIRKTZDV23B2J1'}
              target={'_blank'}
              className={'flex items-center gap-2'}
            >
              <WhatsAppIcon
                className={'h-8 w-8 fill-main opacity-50 hover:opacity-100'}
              />
              <Typography variant={'p2'}>Горячая линия WhatsApp</Typography>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
