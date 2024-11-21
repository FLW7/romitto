import { useRef } from 'react';

import Image from 'next/image';

import NotCatalogImg from '@/assets/icons/not-catalog-img.svg';
import PlusButton from '@/shared/components/plus-button';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
import { useAddress } from '@/shared/state/address';
import { useModal } from '@/shared/state/modal';
import type { ICartOrderItem, TCartRecCard } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

interface ICartRecCardProps {
  toggle?: boolean;
  checked: boolean;
  item: TCartRecCard;
  openModal: (item: ICartOrderItem) => void;
  className?: string;
}

const CartRecCard: React.FC<ICartRecCardProps> = ({
  item,
  checked,
  toggle = false,
  openModal,
  className,
}) => {
  const { addPlate, deletePlate } = useCart();

  const { name } = item || {};

  const { salePrice, price } = item?.values?.[0] || {};

  const { onOpen } = useModal();
  const { address } = useAddress();
  const isLastAddress = !!address?.LastAddressID || !!address?.LastAddressOrgID;

  const handleTogglePlate = () => {
    if (checked) {
      deletePlate(item.id, undefined, item.values[0].mass);
    } else {
      const hasRequiredItem =
        item.modifierBundles &&
        item.modifierBundles.some((bundle) => bundle.isRequired.toString() === '1');

      const addPlateCond = (item: ICartOrderItem) => {
        hasRequiredItem
          ? openModal(item)
          : addPlate({ ...item, price: Number(item.values[0].price) });
      };

      isLastAddress
        ? addPlateCond(item)
        : onOpen('addressNotSpecified', { addPlate: item });
    }
  };

  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <div
      className={cn(
        'mt-5 flex h-[104px] gap-[11px] overflow-hidden rounded-[22px] bg-white shadow-productCart',
        className,
      )}
      onClick={() => {
        openModal(item);
      }}
    >
      {item.thumbnailPicture ? (
        <Image
          ref={imageRef}
          src={
            item?.thumbnailPicture +
            `&width=${imageRef.current?.clientWidth}&height=${imageRef.current?.clientWidth}`
          }
          width={104}
          height={104}
          className='aspect-square object-cover'
          alt='rec-img'
        />
      ) : (
        <NotCatalogImg className='object-cover' />
      )}
      <div className='flex w-full flex-col justify-between p-3'>
        <div>
          <Typography
            variant='desc'
            className={`!line-clamp-2 !overflow-hidden !text-ellipsis !text-sm`}
          >
            {name}
          </Typography>
        </div>
        <div className='flex items-end justify-between'>
          <div>
            {Number(salePrice) > 0 && (
              <Typography
                variant='desc'
                className={'mb-[2px] !text-sm text-secondary line-through'}
              >
                {salePrice} ₽
              </Typography>
            )}
            <Typography variant='desc' className='!text-base !font-semibold'>
              {price} ₽
            </Typography>
          </div>
          <PlusButton onClick={handleTogglePlate} checked={checked} />
        </div>
      </div>
    </div>
  );
};

export default CartRecCard;
