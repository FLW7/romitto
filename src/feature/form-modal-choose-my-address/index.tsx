import { useEffect, useRef } from 'react';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Empty } from './el/empty';

import { AddressField } from '@/entities/address-field';
import { useChooseMyAddress } from '@/feature/form-modal-choose-my-address/model/use-choose-my-address';
import { useDeleteMyAddress } from '@/feature/form-modal-choose-my-address/model/use-delete-my-address';
import { useGetMyAddress } from '@/feature/form-modal-choose-my-address/model/use-get-my-address';
import { useActivePlaceId } from '@/feature/form-modal-choose-pickup/state/use-active-place-id';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { toast } from '@/shared/components/use-toast';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useAddress } from '@/shared/state/address';
import { useDelivery } from '@/shared/state/delivery';
import { useMap } from '@/shared/state/map';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { useCart, useCartOpen } from '@/widgets/cart-widget/state';
import { useSetActiveElCenter } from '@/widgets/yandex-map/model/use-set-active-el-center';

export const FormModalChooseMyAddress: React.FC<{ addPlateItem?: ICartOrderItem }> = ({
  addPlateItem,
}) => {
  const { address, reset } = useAddress();
  const { setAddress } = useAddress();
  const { onOpen } = useModal();
  const selectAddress = useChooseMyAddress();
  const { activeId } = useActivePlaceId();
  const { setCenter } = useMap();
  const { data } = useGetMyAddress();
  const { setActiveEl } = useSetActiveElCenter({ data, isMap: false });
  const { mutateAsync } = useDeleteMyAddress();
  const { setStep, step } = useDelivery();
  const lgScreen = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();
  const { addPlate } = useCart();
  const cartOpen = useCartOpen();

  const handleDelete = async (id: string) => {
    await mutateAsync(id).then(() => {
      if (id === address?.LastAddressID?.toString()) {
        reset();
      }
    });
  };

  const handleSelect = () => {
    const selected = data?.find((el) => el.id === activeId);

    if (selected) {
      const req = {
        LastLng: Number(selected?.longitude),
        LastLat: Number(selected?.lattitude),
        LastAddressID: Number(selected.id),
        LastAddressName: `${selected.street} ${selected.houseNumber}`,
        LastAddressOrgID: Number(selected.organisationID),
        LastAddressType: 1,
        LastAddressIsRecieved: true,
      };

      void selectAddress.mutateAsync(req).then(() => {
        setAddress({
          LastApt: selected.apt,
          LastCommentory: selected?.commentory ?? '',
          LastCountry: selected.country,
          LastDoorNumber: selected?.doorNumber ?? '',
          LastEntreance: selected?.entreance ?? '',
          LastFloor: selected?.floor ?? '',
          LastHouseNumber: selected?.houseNumber,
          LastIsPrivateHouse: selected.isPrivateHouse ? 1 : 0,
          LastStreet: selected.street,
          LastCityName: selected.city,
          LastPolygonID: selected.polygonID,
          ...req,
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
    }
  };

  const handleEdit = (id: string) => {
    const selected = data?.find((el) => el.id === id);

    if (selected) {
      setStep('addAddress');
      onOpen('choosingMyLocation', { deleteId: id });
      setCenter({ lat: Number(selected.lattitude), lng: Number(selected.longitude) });
    }
  };
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current.querySelector(`#address_${activeId}`);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeId]);

  return (
    <div className={'relative flex h-full flex-col sm:justify-between sm:gap-4'}>
      <div className={'space-y-4'}>
        <div className={'flex items-center justify-between'}>
          <div className={'flex grow justify-between'}>
            <Typography variant={'desc'} className='text-xl font-semibold'>
              Мои адреса
            </Typography>
            <Button
              variant={'link'}
              className={'hidden items-center gap-1 !p-0 !no-underline md:flex'}
              type={'button'}
              onClick={() => {
                setStep('addAddress');
              }}
            >
              <Plus size={24} />
              Добавить адрес
            </Button>
          </div>

          <Button
            type={'button'}
            variant={'link'}
            className={'p-0 text-sm md:hidden'}
            onClick={() => {
              setStep('addAddress');
            }}
          >
            Добавить адрес
          </Button>
        </div>
        {/*  */}
        <div
          className={
            'scrollbar-thin h-[calc(600px-20px-28px-44px-72px-20px-48px)] grow overflow-auto pb-20 max-md:h-[300px] sm:space-y-4'
          }
        >
          {!data?.length && <Empty />}
          <div className={'flex flex-col space-y-4 pr-4'} ref={ref}>
            {data?.map((address) => (
              <AddressField
                id={address.id}
                key={address.id}
                address={`${address.street}  д. ${address.houseNumber}`}
                isActive={address.id === activeId}
                onDelete={async () => {
                  await handleDelete(address.id);
                }}
                onEdit={() => {
                  handleEdit(address.id);
                }}
                onClick={() => {
                  setActiveEl(address.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {!!data?.length && (
        <div
          className={
            'gap-2 max-sm:absolute max-sm:bottom-[0px] max-sm:left-0 max-sm:w-full max-sm:pt-3 sm:mt-auto'
          }
        >
          <Button
            className={'block w-full sm:mt-0'}
            onClick={handleSelect}
            id={step + 'Button'}
          >
            Выбрать
          </Button>
        </div>
      )}
    </div>
  );
};
