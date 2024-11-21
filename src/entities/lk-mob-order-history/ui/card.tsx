import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import { type IOrderItem } from '@/widgets/lk/order-history/type';
interface CardProperties extends IOrderItem {
  onClick: () => void;
}
export function Card({ onClick, ...order }: CardProperties) {
  return (
    <button
      className={
        'flex w-full items-stretch  justify-between bg-white p-4 text-start shadow-cardLk'
      }
      onClick={onClick}
    >
      <div className={'max-w-[60%] space-y-2'}>
        <Typography variant={'p2'} className={'font-[600]'}>
          {`Заказ #${order.orderID}`}
        </Typography>

        <Typography variant={'desc'} className={'text-secondary'}>
          {order.deliveryAddress}
        </Typography>

        <Typography variant={'desc'} className={'text-secondary'}>
          {order.dateCreated}
        </Typography>

        <Typography variant={'p2'} className={'font-[600] text-main'}>
          {priceFormatter(order.salePrice)}
        </Typography>
      </div>
      <div className='center'>
        <ArrowRightIcon />
      </div>
    </button>
  );
}
