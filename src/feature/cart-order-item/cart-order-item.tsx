/* eslint-disable unicorn/consistent-destructuring */
'use client';

import Image from 'next/image';

import styles from './styles.module.css';

import NotCatalogImg from '@/assets/icons/not-catalog-img.svg';
import Counter from '@/entities/counter/counter';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import type { ICartOrderItem } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

interface ICartOrderItemProps {
  item: ICartOrderItem;
  min?: boolean;
}

const CartOrderItem: React.FC<ICartOrderItemProps> = ({ item, min = false }) => {
  const { deletePlate, changePlateCount } = useCart();
  // const [commentValue, setCommentValue] = useState('');

  const { id, thumbnailPicture, name, countInCart, maxCount, modifiers, values, price } =
    item;

  const { mass } = values?.[0] || {};

  const deleteHandler = () => {
    deletePlate(id, modifiers, mass);
  };

  const countHandler = (value: number) => {
    if (value === 0) {
      deleteHandler();
    } else {
      changePlateCount(id, value, modifiers, mass);
    }
  };

  // const commentHandler = (value: string) => {
  //   setPlateComment(id, value, modifiers, mass);
  // };

  const modifiersItems = modifiers?.flatMap((mod) => mod.items);

  // useEffect(() => {
  //   setCommentValue(comment ?? '');
  // }, []);

  return (
    <li className={styles.basketItem}>
      {thumbnailPicture ? (
        <Image
          src={thumbnailPicture ?? NotCatalogImg}
          width={100}
          height={100}
          alt='order-image'
          className={styles.basketItem__image}
        />
      ) : (
        <NotCatalogImg className={styles.basketItem__image} />
      )}
      <div className={styles.basketItem__content}>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between'>
            <Typography
              variant='desc'
              className={`line-clamp-2 text-sm font-normal text-primary`}
            >
              {name}
            </Typography>
          </div>
          <Typography
            variant='p'
            className={`mb-0 h-fit !text-xs !font-normal !leading-[17px] text-secondary`}
          >
            {mass && `${mass}`}
          </Typography>
          {modifiersItems && (
            <Typography variant='desc' className='text-xs font-semibold text-secondary'>
              {modifiersItems
                .map(
                  (item) =>
                    item.name +
                    (item.price > 0
                      ? ` (${priceFormatter(item.price * (item.count ?? 1))})`
                      : ''),
                )
                .join(' + ')}
            </Typography>
          )}
        </div>
        <div className={styles.basketItem__actions}>
          <div className='flex items-center gap-[18px] max-md:gap-[13px]'>
            <Counter
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              value={countInCart || 0}
              minValue={0}
              maxValue={maxCount}
              callBack={countHandler}
              className={min ? '!h-9' : '!h-[28px] !w-[90px]'}
              classNameText='!text-sm !font-semibold'
            />
          </div>
          <Typography
            variant='desc'
            className={`mb-0 text-base !font-semibold text-primary`}
          >
            {priceFormatter(Number(price) * (countInCart ?? 1))}
          </Typography>
        </div>
      </div>
      {/* {!min && (
        <div className='m-4'>
          <Input
            className='max-md:h-11'
            placeholder='Комментарий к блюду...'
            value={commentValue}
            onBlur={() => {
              commentHandler(commentValue);
            }}
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
          />
        </div>
      )} */}
    </li>
  );
};

export default CartOrderItem;
