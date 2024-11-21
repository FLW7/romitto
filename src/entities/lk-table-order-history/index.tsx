import { Row } from './ui/row';

import { LkCardWrapper } from '@/entities/card-personal-information';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/table';
import { useModal } from '@/shared/state/modal';
import { type IOrderItem } from '@/widgets/lk/order-history/type';

interface LkTableOrderHistoryProperties {
  titlesArr: string[];
  tableData?: IOrderItem[];
  loading: boolean;
}
export function LkTableOrderHistory({
  tableData,
  titlesArr,
  loading,
}: LkTableOrderHistoryProperties) {
  const { onOpen } = useModal();
  const handleClick = (id: string) => {
    onOpen('detailOrder', { id });
  };

  return (
    <LkCardWrapper
      className={'max-h-[500px] overflow-y-auto lg:bg-bgSecondary'}
      loading={loading}
    >
      <Table>
        <TableHeader>
          <TableRow className='text-primary'>
            {titlesArr.map((title) => (
              <TableHead key={title}>{title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='bg-bgSecondary'>
          {tableData?.map((order, index) => (
            <Row
              key={index}
              {...order}
              onClick={() => {
                handleClick(order.orderID);
              }}
            />
          ))}
        </TableBody>
      </Table>
    </LkCardWrapper>
  );
}
