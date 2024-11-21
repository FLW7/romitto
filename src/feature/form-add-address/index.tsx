'use client';

import { useEffect, useState } from 'react';
import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { baseFormPrivateHouseSchema, baseFormSchema, type FormType } from './schema';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { CheckboxField } from '@/entities/checkbox-field';
import { FullFormField } from '@/entities/form-field';
import { useAddNewAddress } from '@/feature/form-add-address/model/use-add-new-address';
import { useGetOrganisationMutate } from '@/feature/form-add-address/model/use-get-organisation-mutate';
import { useGetPlaceByLoc } from '@/feature/form-add-address/model/use-get-place-by-loc';
import { useDeleteMyAddress } from '@/feature/form-modal-choose-my-address/model/use-delete-my-address';
import { DeliveryTabs } from '@/feature/form-placing-order/el/delivery-tabs';
import InputAddress from '@/feature/input-address/input-address';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import { ScrollArea } from '@/shared/components/scroll-area';
import Typography from '@/shared/components/typography';
import { toast } from '@/shared/components/use-toast';
import { MAP_DEFAULT } from '@/shared/const/map';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useAddress } from '@/shared/state/address';
import { useDelivery } from '@/shared/state/delivery';
import { useMap } from '@/shared/state/map';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { useCart, useCartOpen } from '@/widgets/cart-widget/state';
import InputAddressModal from '@/widgets/modal/input-address-modal';

export const FormAddAddress: React.FC<{ addPlateItem?: ICartOrderItem }> = ({
  addPlateItem,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isActive, setIsActive] = useState<boolean>(false);
  const { setAddress } = useAddress();
  const { data, onClose } = useModal();
  const {
    center: { lat, lng },
  } = useMap();
  const { setStep } = useDelivery();

  const { mutate: handleDelete } = useDeleteMyAddress(data?.deleteId);
  const [formSchema, setFormSchema] = useState<any>(baseFormSchema);

  const [isPolygon, setIsPolygon] = useState<boolean>(false);
  const { address } = useAddress();

  const form = useForm<FormType>({
    defaultValues: {
      isPrivateHouse: Boolean(address?.LastIsPrivateHouse ?? false),
      apt: address?.LastApt ?? undefined,
      doorNumber: address.LastDoorNumber ?? undefined,
      entreance: address?.LastEntreance ?? undefined,
      floor: address?.LastFloor ?? undefined,
    },
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { setError, setValue, formState, clearErrors, watch, resetField } = form;
  const isPrivateHouse = watch('isPrivateHouse');

  const lgScreen = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();
  const { addPlate } = useCart();
  const cartOpen = useCartOpen();

  const addNewAddress = useAddNewAddress({
    handleDelete,
    deleteId: data?.deleteId,
  });

  const { mutate, isPending } = useGetOrganisationMutate({
    setIsPolygon,
    setError,
    setValue,
  });

  const getPlaceByLoc = useGetPlaceByLoc({
    setValue,
    setError,
    mutate,
    errorAddress: formState.errors?.address as unknown as string,
    clearErrors,
  });

  const loading = getPlaceByLoc.isPending || addNewAddress.isPending;

  const onSubmit = async (data: FormType) => {
    await addNewAddress
      .mutateAsync({
        Apt: data.apt ?? '',
        City: data.city,
        Commentory: data?.commentory ?? '',
        Country: data.country,
        DoorNumber: data?.doorNumber ?? '',
        Entreance: data?.entreance ?? '',
        Floor: data?.floor ?? '',
        HouseNumber: data?.houseNumber,
        IsPrivateHouse: data.isPrivateHouse ? 1 : 0,
        Lattitude: data.lattitude.toString(),
        Longitude: data.longitude.toString(),
        OrganisationID: data.organisationID,
        PolygonID: data.polygonID,
        Street: data.street,
      })
      .then((res) => {
        setAddress({
          LastApt: data.apt,
          LastCommentory: data?.commentory ?? '',
          LastCountry: data.country,
          LastDoorNumber: data?.doorNumber ?? '',
          LastEntreance: data?.entreance ?? '',
          LastFloor: data?.floor ?? '',
          LastHouseNumber: data?.houseNumber,
          LastIsPrivateHouse: data.isPrivateHouse ? 1 : 0,
          LastStreet: data.street,
          LastLng: data?.longitude,
          LastLat: data?.lattitude,
          LastCityName: data?.city,
          LastAddressID: res?.id,
          LastAddressName: data?.address,
          LastAddressOrgID: data?.organisationID,
          LastAddressType: 1,
          LastPolygonID: data?.polygonID.toString(),
          LastAddressIsRecieved: true,
        });
        if (addPlateItem) {
          addPlate({ ...addPlateItem, price: Number(addPlateItem?.values[0]?.price) });
          toast({
            title: `Вы добавили "${addPlateItem.name}" в свою корзину.`,
            description: (
              <Button
                variant={'link'}
                className='mt-2 p-0'
                onClick={() => {
                  lgScreen ? router.push('/cart') : cartOpen.onOpen();
                }}
              >
                Просмотр корзины
              </Button>
            ),
            variant: 'success',
          });
        }
      });
  };

  const inputClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsActive(true);
  };

  useEffect(() => {
    if (MAP_DEFAULT.center[0] !== lat && MAP_DEFAULT.center[1] !== lng) {
      console.log('render');
      !isPending && getPlaceByLoc.mutate({ lat, lng });
    }
  }, [lat, lng]);

  useEffect(() => {
    if (isPrivateHouse) {
      setFormSchema(baseFormPrivateHouseSchema);
      resetField('entreance');
      resetField('apt');
      resetField('floor');
      resetField('doorNumber');
    } else {
      setFormSchema(baseFormSchema);
    }
  }, [isPrivateHouse]);

  return (
    <Form {...form}>
      <form
        id={'addAddress'}
        onSubmit={form.handleSubmit(onSubmit)}
        className={'relative flex h-full flex-col'}
      >
        <div className={'mb-3 sm:mb-0'}>
          <DeliveryTabs
            step={'delivery'}
            deliveryClick={() => {
              setStep('delivery');
            }}
            pickupClick={() => {
              setStep('pickup');
            }}
          />
        </div>

        <div className={'mb-5 hidden items-center sm:mt-2 sm:flex'}>
          <Button
            className={' !py-2 !pl-0 !pr-4 sm:flex'}
            variant={'link'}
            type={'button'}
            onClick={() => {
              onClose();
            }}
          >
            <ArrowLeftIcon className={'h-4 w-4'} />
          </Button>
          <Typography variant={'h5'}>{data?.title ?? 'Новый адрес'}</Typography>
        </div>

        <ScrollArea className='h-[38vh]'>
          {isMobile ? (
            <div onClick={inputClick} className={'w-full text-start'}>
              <FullFormField
                isClear
                error={formState?.errors?.address?.message}
                disabled={loading}
                label={'Город, улица, дом'}
                name={'address'}
                onInput={inputClick}
              />
            </div>
          ) : (
            <InputAddress mutate={mutate} />
          )}

          <CheckboxField
            name={'isPrivateHouse'}
            label={'Частный дом'}
            className={'my-4'}
            disabled={loading}
          />
          <div className={'grid grid-cols-2 gap-2 max-sm:pb-10 sm:gap-3'}>
            <FullFormField
              isClear
              disabled={isPrivateHouse || loading}
              label={'Подъезд'}
              name={'entreance'}
            />
            <FullFormField
              isClear
              disabled={isPrivateHouse || loading}
              label={'Код двери'}
              name={'doorNumber'}
            />
            <FullFormField
              isClear
              disabled={isPrivateHouse || loading}
              label={'Этаж'}
              name={'floor'}
            />
            <FullFormField
              isClear
              disabled={isPrivateHouse || loading}
              label={'Квартира'}
              name={'apt'}
            />
            <FullFormField
              isClear
              disabled={loading}
              label={'Комментарий'}
              name={'commentory'}
              fieldClassName={'col-span-2'}
            />
          </div>
        </ScrollArea>

        <div
          className={
            'mt-3 gap-2 bg-white max-sm:absolute max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:pt-3 sm:mt-auto'
          }
        >
          <Button
            id={'addAddressButton'}
            className={'w-full'}
            disabled={loading || !isPolygon || !!formState.errors?.address?.message}
          >
            {data?.deleteId ? 'Изменить' : 'Добавить'}
          </Button>
        </div>

        <InputAddressModal
          isActive={isActive}
          setIsActive={setIsActive}
          mutate={mutate}
        />
      </form>
    </Form>
  );
};
