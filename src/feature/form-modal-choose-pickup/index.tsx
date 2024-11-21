import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { AddressField } from '@/entities/address-field';
import { useChooseMyAddress } from '@/feature/form-modal-choose-my-address/model/use-choose-my-address';
import { useGetOrganisation } from '@/feature/form-modal-choose-pickup/model/use-get-organisation';
import { useActivePlaceId } from '@/feature/form-modal-choose-pickup/state/use-active-place-id';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { toast } from '@/shared/components/use-toast';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useAddress } from '@/shared/state/address';
import { useDelivery } from '@/shared/state/delivery';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { useCart, useCartOpen } from '@/widgets/cart-widget/state';
import { useSetActiveElCenter } from '@/widgets/yandex-map/model/use-set-active-el-center';
interface Props {
  title?: string;
  desc?: string;
  addPlateItem?: ICartOrderItem;
}
export const FormModalChoosePickup = ({ desc, title, addPlateItem }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { step } = useDelivery();
  const { setAddress } = useAddress();
  const { activeId } = useActivePlaceId();
  const { data } = useGetOrganisation();
  const selectAddress = useChooseMyAddress();
  const { setActiveEl } = useSetActiveElCenter({ data, isMap: false });
  const lgScreen = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();
  const { addPlate } = useCart();
  const cartOpen = useCartOpen();

  const handleSelect = async () => {
    const selected = data?.find((el) => el.id === activeId);

    if (selected) {
      const data = {
        LastLng: Number(selected?.longitude),
        LastLat: Number(selected?.lattitude),
        LastAddressID: 0,
        LastAddressName: `${selected.name}`,
        LastAddressOrgID: Number(selected.id),
        LastAddressType: 2,
        LastAddressIsRecieved: true,
      };

      await selectAddress.mutateAsync(data).then(() => {
        setAddress({
          ...data,
          LastCityName: selected.city,
          LastPolygonID: selected.id,
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
    <div
      className={
        ' relative flex h-full grow flex-col overflow-hidden sm:justify-between sm:gap-8'
      }
    >
      <div className={'mb-4 sm:mb-0'}>
        <Typography variant={'h6'}>{title ?? 'Самовывоз'}</Typography>
        {desc && (
          <Typography variant={'desc'} className={'text-secondary sm:mt-2'}>
            {desc}
          </Typography>
        )}
      </div>
      <div
        className={
          'scrollbar-thin max-h-[calc(39vh)] grow overflow-auto pb-16 sm:max-h-[360px] sm:space-y-4'
        }
      >
        <div className={'flex flex-col space-y-4 pr-4'} ref={ref}>
          {data
            ?.filter((item) => String(item.isHaveLocalOrder) === '1')
            ?.map((item) => {
              return (
                <AddressField
                  id={item.id}
                  hideEditIcon
                  hideDeleteIcon
                  key={item.id}
                  onClick={() => {
                    setActiveEl(item.id);
                  }}
                  isHiddenWorkTime={isMobile}
                  address={item?.name}
                  isActive={item?.id === activeId}
                  desc={item.timetableDescription}
                />
              );
            })}
        </div>
      </div>
      <div
        className={
          'gap-2 bg-white max-sm:absolute max-sm:bottom-[0px] max-sm:left-0 max-sm:w-full max-sm:pt-3 sm:mt-auto'
        }
      >
        <Button
          className={'w-full sm:mt-0 md:block'}
          onClick={handleSelect}
          id={step + 'Button'}
        >
          Выбрать
        </Button>
      </div>
    </div>
  );
};
