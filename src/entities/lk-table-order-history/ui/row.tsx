import { TableCell, TableRow } from '@/shared/components/table';
import { getDateAndMonth } from '@/shared/lib/date';
import { priceFormatter } from '@/shared/lib/price';
import { cn } from '@/shared/lib/utils';
import { getStatusColor } from '@/widgets/lk/order-history/lib';
import { type IOrderItem } from '@/widgets/lk/order-history/type';
interface OrderProperties extends IOrderItem {
  onClick: () => void;
}
export function Row(order: OrderProperties) {
  const { day, month } = getDateAndMonth(order.dateCreated);

  return (
    <TableRow className='text-primary'>
      <TableCell>{`Заказ #${order.orderID} ${day}.${month}`}</TableCell>
      <TableCell>{priceFormatter(order.salePrice)}</TableCell>
      <TableCell>{order.deliveryType === '1' ? 'Доставка' : 'Самовывоз'}</TableCell>
      <TableCell className={'max-w-[400px]'}>{order.deliveryAddress}</TableCell>
      <TableCell className={cn(getStatusColor(order.status))}>{order.status}</TableCell>
      <TableCell className={'cursor-pointer text-blue'} onClick={order.onClick}>
        подробнее
      </TableCell>
    </TableRow>
  );
}
