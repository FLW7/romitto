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
  const { id, name, countInCart, maxCount, price } = item;
  const { priceForAddition } = useCart();

  return (
    <li key={id} className='flex items-center justify-between'>
      <div>
        <Typography variant='desc' className='text-sm font-normal'>
          {name}
        </Typography>
        {Number(priceForAddition) === 0 && Number(price ?? 0) > 0 && (
          <Typography
            variant='desc'
            className='whitespace-nowrap !text-xs font-normal text-secondary'
          >
            {priceFormatter(price ?? 0)}
          </Typography>
        )}
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
