'use client';

// import { AddressField } from './el/address-field';

import { AddressField } from '@/entities/address-field';
import { useDeleteMyAddress } from '@/feature/form-modal-choose-my-address/model/use-delete-my-address';
import { useGetMyAddress } from '@/feature/form-modal-choose-my-address/model/use-get-my-address';
import { MAConfig } from '@/feature/form-my-addresses/config';
import { NoData } from '@/feature/form-my-addresses/el/no-data';
import { ButtonAddAddress, MobAddAddress } from '@/feature/lk-add-address';
import { MobAddFavorite } from '@/feature/lk-add-favorite';
import { Skeleton } from '@/shared/components/skeleton';
import Typography from '@/shared/components/typography';
import { useAddress } from '@/shared/state/address';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';

export const FormMyAddresses = () => {
  const { address, reset } = useAddress();

  const { onOpen } = useModal();
  const { setStep } = useDelivery();
  const { data, isLoading } = useGetMyAddress();

  const { mutateAsync } = useDeleteMyAddress();

  const handleDelete = async (id: string) => {
    await mutateAsync(id).then(() => {
      if (id === address?.LastAddressID?.toString()) {
        reset();
      }
    });
  };

  return (
    <div className={'flex grow flex-col '}>
      <div className={'grid grid-cols-2 px-4 md:mb-4 md:p-0'}>
        <Typography variant={'h6'}>{MAConfig.title}</Typography>
      </div>

      <div className={'my-4 md:hidden '}>
        <MobAddAddress />
      </div>

      <div className={'flex grow flex-col px-4 md:gap-10 md:p-0'}>
        {!data?.length && !isLoading && <NoData />}
        <div className={'scrollbar-thin max-h-[20rem] space-y-3 overflow-auto pr-2 '}>
          {isLoading &&
            [1, 2, 3].map((item) => (
              <Skeleton key={item} className={'h-12 rounded-xl'} />
            ))}

          {data?.map((address) => (
            <AddressField
              id={address.id}
              key={address.id}
              address={`${address.street}  д. ${address.houseNumber}`}
              isActive={false}
              onDelete={async () => {
                await handleDelete(address.id);
              }}
              onEdit={() => {
                setStep('addAddress');
                onOpen('choosingMyLocation', { deleteId: address.id });
              }}
              onClick={() => {}}
            />
          ))}
        </div>
        <div className={'mx-auto mt-auto hidden  md:block'}>
          <ButtonAddAddress />
        </div>

        <MobAddFavorite />
      </div>
    </div>
  );
};
