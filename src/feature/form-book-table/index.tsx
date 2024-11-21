import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FullFormField } from '@/entities/form-field';
import { useCreateReservation } from '@/feature/form-book-table/model/use-create-reservation';
import AdressBlock from '@/feature/form-placing-order/el/adress-block';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import Typography from '@/shared/components/typography';
import { useGetProfile } from '@/shared/hooks/query/profile';
import { useAddress } from '@/shared/state/address';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';

const formSchema = z.object({
  phone: z.string().min(1, {
    message: 'Введите телефон',
  }),
  name: z.string(),
  count: z.number(),
  commit: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

export const FormBookTable = () => {
  const { setStep } = useDelivery();
  const { onOpen, data } = useModal();
  const { data: profile } = useGetProfile();
  const { address } = useAddress();

  const { mutate, isPending } = useCreateReservation();

  const form = useForm<FormType>();

  const date = data?.date as { date: string; time: string };

  const onSubmit = (data: FormType) => {
    if (address?.LastAddressOrgID && profile?.id) {
      mutate({
        GetLink: 1,
        Guests: data.count,
        Date: date.date + ' ' + date.time,
        Comment: data.commit,
        Phone: data.phone,
        OrganisationID: address?.LastAddressOrgID,
        UserID: Number(profile?.id),
        Name: data.name,
        platform: 1,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'mb-3'}>
          <AdressBlock
            tooltipTitle={'Не забудьте проверить адрес бронирования'}
            tooltipTime={'Выберите время бронирования'}
            title={'Адрес бронирование'}
            openTimePicker={() => {
              onOpen('bookTableDatePicker', { date });
            }}
            onClickAddress={() => {
              setStep('booking');
              onOpen('choosingMyLocation', { date }, 'bookTable');
            }}
            deliveryTime={date}
          />
        </div>
        <div className={'mb-7 grid grid-cols-2 gap-3'}>
          <FullFormField
            fieldClassName={'col-span-2'}
            label={'Имя'}
            name={'name'}
            isLoading={isPending}
            disabled={isPending}
          />

          <FullFormField
            label={'Номер телефона'}
            name={'phone'}
            type={'tel'}
            isLoading={isPending}
            disabled={isPending}
          />

          <FullFormField
            label={'Кол-во гостей'}
            name={'count'}
            type={'number'}
            isLoading={isPending}
            disabled={isPending}
          />

          <FullFormField
            fieldClassName={'col-span-2'}
            label={'Комментарий'}
            name={'commit'}
            isLoading={isPending}
            disabled={isPending}
          />
        </div>

        <Typography variant={'p2'} className={'mb-7 text-center text-main'}>
          Внимание! Для бронирования столика требуется внести предоплату в размере 500 ₽ с
          человека
        </Typography>

        <div className={'center'}>
          <Button className={'mx-auto w-[320px]'} disabled={isPending}>
            Перейти к оплате
          </Button>
        </div>
      </form>
    </Form>
  );
};
