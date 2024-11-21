import BoxIcon from '@/assets/icons/cart/box.svg';
import Info from '@/assets/icons/info.svg';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import { useAddress } from '@/shared/state/address';
import { useCart } from '@/widgets/cart-widget/state';

const CartDeliveryPrice: React.FC<{ deliveryMinPrice?: string }> = ({
  deliveryMinPrice,
}) => {
  const { orderSum } = useCart();
  const { address } = useAddress();

  const progress = (orderSum / Number(deliveryMinPrice)) * 100;

  return (
    address.LastAddressType === 1 &&
    Number(deliveryMinPrice ?? '0') > orderSum && (
      <div className='flex w-full items-center justify-between rounded-xl bg-white px-4 py-[11px] shadow-cartBlockShadow'>
        <div className='flex items-center gap-3'>
          <div className='relative flex h-[38px] w-[38px] items-center justify-center'>
            <div
              className='absolute inset-0 rounded-full'
              style={{
                clipPath: 'circle(50%)',
                background: `conic-gradient(
              #FBBB1F ${progress * 3.6}deg,
              #f3f4f8 ${progress * 3.6}deg
            )`,
              }}
            />

            <div className='z-[1] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-lightGray'>
              <BoxIcon className='h-6 w-6' />
            </div>
          </div>
          <div>
            <Typography variant='desc' className='!text-sm font-semibold'>
              еще {priceFormatter(Number(deliveryMinPrice) - orderSum)}
            </Typography>
            <Typography variant='desc' className='!text-xs text-secondary'>
              до минимальной суммы заказа
            </Typography>
          </div>
        </div>
        <Info className='h-6 w-6' />
      </div>
    )
  );
};

export default CartDeliveryPrice;
