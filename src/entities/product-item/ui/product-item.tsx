import { useEffect, useRef, useState, type FC } from 'react';

import Image from 'next/image';

import styles from './styles.module.css';

import NotCatalogImg from '@/assets/icons/not-catalog-img.svg';
import Counter from '@/entities/counter/counter';
import HeartIcon from '@/entities/heart-icon';
import { Button } from '@/shared/components/button';
import PlusButton from '@/shared/components/plus-button';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { priceFormatter } from '@/shared/lib/price';
import { useAddress } from '@/shared/state/address';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

interface ProductItemProps {
  item: any;
  handleOpenModal: (item: ICartOrderItem) => void;
}

const ProductItem: FC<ProductItemProps> = ({ item, handleOpenModal }) => {
  const { onOpen } = useModal();
  const { address } = useAddress();
  // TODO Изменить условие
  const isLastAddress = !!address?.LastAddressID || !!address?.LastAddressOrgID;

  const [likedItems, setLikedItems] = useState<number[]>([]);
  const refTimer = useRef<NodeJS.Timeout | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>({});

  const { addPlate, deletePlate, changePlateCount, orders } = useCart();

  const isSmallScreen = useMediaQuery('(max-width:640px)');
  const isTypeOfWindow = typeof window !== 'undefined';

  useEffect(() => {
    if (isTypeOfWindow) {
      const storedSelectedItems = window.localStorage.getItem(`selectedItems`);

      if (storedSelectedItems) {
        setSelectedItems(JSON.parse(storedSelectedItems));
      }
    }
  }, [isTypeOfWindow]);

  useEffect(() => {
    if (isTypeOfWindow) {
      setTimeout(() => {
        window.localStorage.setItem(`selectedItems`, JSON.stringify(selectedItems));
      }, 0);
    }
  }, [isTypeOfWindow, selectedItems]);

  useEffect(() => {
    if (isTypeOfWindow) {
      const storedLikedItems = window.localStorage.getItem('likedItems');

      if (storedLikedItems) {
        setLikedItems(JSON.parse(storedLikedItems));
      }
    }
  }, [isTypeOfWindow]);

  useEffect(() => {
    if (isTypeOfWindow) {
      refTimer.current = setTimeout(() => {
        window.localStorage.setItem('likedItems', JSON.stringify(likedItems));
      }, 0);

      return () => {
        if (refTimer.current) {
          clearTimeout(refTimer.current);
        }
      };
    }
  }, [isTypeOfWindow, likedItems]);

  const toggleLike = (id: number) => () => {
    setLikedItems((prevLikedItems) => {
      const isLiked = prevLikedItems.includes(id);

      return isLiked
        ? prevLikedItems.filter((itemId) => itemId !== id)
        : [...prevLikedItems, id];
    });
  };

  const isLiked = (id: number) => likedItems.includes(id);

  const countHandler = (value: number) => {
    if (value === 0) {
      deletePlate(item.id, undefined, item.values[0].mass);
    }

    changePlateCount(item.id, value, undefined, item.values[0].mass);
  };

  return (
    <div
      className={`${styles.render_list_item} ${styles.render_list_item_wrapper} ${isSmallScreen ? 'max-h-[282px] w-[167px] rounded-[16px] shadow-cardLk' : styles.card_sizes}`}
    >
      <HeartIcon
        width={isSmallScreen ? 44 : 57}
        height={isSmallScreen ? 44 : 57}
        isLiked={isLiked(item.id)}
        onClick={toggleLike(item.id)}
        className={styles.heart_catalog}
      />
      <div
        onClick={() => {
          handleOpenModal(item);
        }}
        className={`${styles.render_list_image_wrapper} ${isSmallScreen ? 'max-h-[151px] w-[151px]' : `h-[262px] ${styles.card_img_sizes}`}`}
      >
        <Image
          src={item.thumbnailPicture ?? NotCatalogImg}
          alt={item.name}
          width={isSmallScreen ? 151 : 330}
          height={isSmallScreen ? 151 : 330}
          loading='lazy'
          className={`h-[262px] object-cover ${isSmallScreen ? 'max-h-[151px] max-w-[151px]' : styles.card_img_sizes}`}
        />
      </div>
      <div
        onClick={() => {
          handleOpenModal(item);
        }}
        className={`${styles.card_wrapper} ${isSmallScreen ? 'w-[167px]' : styles.card_img_sizes}`}
      >
        <div
          className={`truncate ${styles.card_name} ${isSmallScreen ? 'mb-[10px] max-h-[100px] max-w-[150px] text-[12px] font-medium' : 'mb-[10px] text-xl font-semibold'}`}
        >
          {item.name}
        </div>
        {isSmallScreen ? null : (
          <Typography variant={'p2'} className={`${styles.card_description}`}>
            {item.composition}
          </Typography>
        )}
        <div
          onClick={() => {
            handleOpenModal(item);
          }}
          className={styles.card_price}
        >
          {isSmallScreen ? (
            <Typography
              variant={'desc'}
              className='relative top-[13px] pl-[2px] font-semibold'
            >
              {priceFormatter(item.price)}
            </Typography>
          ) : (
            <Typography variant={'p2'} className='text-sm font-semibold text-secondary'>
              {item.values[0]?.mass} г
            </Typography>
          )}
        </div>
      </div>
      <div
        className={`flex items-center justify-between ${isSmallScreen ? 'h-[50px] w-[146px] px-[3px]' : `px-[10px] ${styles.card_img_sizes}`}`}
      >
        {isSmallScreen ? (
          <div className='text-[12px] font-medium text-secondary'>
            {(orders?.find((i) => i.id === item.id)?.countInCart ?? 0) > 0
              ? null
              : `${item.values[0]?.mass} г`}
          </div>
        ) : (
          <Typography
            variant={'h3'}
            className={`text-xl font-semibold ${isSmallScreen && 'text-base'}`}
          >
            {priceFormatter(item.price)}
          </Typography>
        )}
        <div>
          {isSmallScreen ? (
            <div>
              {(orders?.find((i) => i.id === item.id)?.countInCart ?? 0) > 0 ? (
                <div>
                  <Counter
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    value={orders.find((i) => i.id === item.id)?.countInCart ?? 0}
                    minValue={0}
                    maxValue={item.maxCount}
                    callBack={countHandler}
                    style={{ width: '147px', position: 'relative', right: '4px' }}
                  />
                </div>
              ) : (
                <PlusButton
                  onClick={() => {
                    addPlate(item);
                  }}
                />
              )}
            </div>
          ) : (
            <>
              {(orders?.find((i) => i.id === item.id)?.countInCart ?? 0) > 0 ? (
                <div className='h-[40px] w-[120px]'>
                  <Counter
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    value={orders.find((i) => i.id === item.id)?.countInCart ?? 0}
                    minValue={0}
                    maxValue={item.maxCount}
                    callBack={countHandler}
                  />
                </div>
              ) : (
                <Button
                  variant='outline'
                  className='h-[40px] w-[120px]'
                  onClick={() => {
                    isLastAddress
                      ? addPlate(item)
                      : onOpen('addressNotSpecified', { addPlate: item });
                  }}
                >
                  Выбрать
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
