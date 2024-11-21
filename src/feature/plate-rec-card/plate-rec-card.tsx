import { useRef } from 'react';

import Image from 'next/image';

import styles from './styles.module.css';

import NotCatalogImg from '@/assets/icons/not-catalog-img.svg';
import PlusButton from '@/shared/components/plus-button';
import Typography from '@/shared/components/typography';
import { useAddress } from '@/shared/state/address';
import { useModal } from '@/shared/state/modal';
import type { ICartOrderItem, TCartRecCard } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

interface IPlateRecCardProps {
  toggle?: boolean;
  checked: boolean;
  item: TCartRecCard;
  openModal: (item: ICartOrderItem) => void;
}

const PlateRecCard: React.FC<IPlateRecCardProps> = ({
  item,
  checked,
  toggle = false,
  openModal,
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
      className={styles.carouselCard}
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
          width={200}
          height={126}
          className='object-cover'
          alt='rec-img'
        />
      ) : (
        <NotCatalogImg className='h-[126px] w-[126px] object-cover max-md:h-[80px] max-md:w-[80px]' />
      )}
      <div className='flex w-full flex-col justify-between p-[10px] pl-0 max-md:p-2'>
        <div>
          <Typography
            variant='h4'
            className={`w-full !overflow-hidden !text-ellipsis break-words !text-sm max-md:!line-clamp-1 ${styles.carouselCard__title}`}
          >
            {name}
          </Typography>
        </div>
        <div className='flex items-end justify-between'>
          <div>
            {Number(salePrice) > 0 && (
              <Typography variant='p' className={styles.carouselCard__weight}>
                {salePrice} ₽
              </Typography>
            )}
            <Typography variant='p' className='!text-base !font-semibold'>
              {price} ₽
            </Typography>
          </div>
          <PlusButton onClick={handleTogglePlate} checked={checked} />
        </div>
      </div>
    </div>
  );
};

export default PlateRecCard;
