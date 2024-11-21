import Image from 'next/image';

import Counter from '@/entities/counter/counter';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import type { TAdditiveItem } from '@/widgets/cart-widget/config';
import { useCart } from '@/widgets/cart-widget/state';

interface ICartAdditionalItemProperties {
  item: TAdditiveItem;
  onChange: (id: number, value: number) => void;
}

const CartAdditionalItem: React.FC<ICartAdditionalItemProperties> = ({
  item,
  onChange,
}) => {
  const { id, name, countInCart, maxCount, price, picture } = item;
  const { priceForAddition } = useCart();

  return (
    <li key={id} className='flex items-center justify-between gap-3'>
      <div className='flex items-center gap-2'>
        {picture && (
          <Image src={picture} width={47} height={47} alt={name} className='rounded-lg' />
        )}
        <Typography variant='desc' className='text-base font-medium max-md:text-sm'>
          {name}
          {Number(priceForAddition) === 0 && (
            <Typography
              variant='desc'
              className='ml-2 inline whitespace-nowrap !text-sm font-normal text-secondary md:!text-base'
            >
              {priceFormatter(price ?? 0)}
            </Typography>
          )}
        </Typography>
      </div>
      <Counter
        value={countInCart ?? 0}
        maxValue={maxCount}
        callBack={(val) => {
          onChange(id, val);
        }}
        className='max-h-[28px] max-w-[90px]'
      />
    </li>
  );
};

export default CartAdditionalItem;
