'use client';

import { LoaderCircle } from 'lucide-react';

import { Card } from './ui/card';

import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';
import { type IOrderItem } from '@/widgets/lk/order-history/type';

interface LkTableOrderHistoryProperties {
  orders?: IOrderItem[];
  loading: boolean;
}

export function LkMobOrderHistory({ orders, loading }: LkTableOrderHistoryProperties) {
  const { onOpen } = useModal();
  const statuses = Array.from(new Set(orders?.map((order) => order.status)));

  const handleClick = (id: string) => {
    onOpen('detailOrder', { id });
  };

  return (
    <div className={'space-y-7'}>
      {loading && (
        <div className={'center my-10'}>
          <LoaderCircle className={'h-10 w-10 animate-spin text-main'} />
        </div>
      )}
      {statuses.map((status) => (
        <div key={status}>
          <Typography variant={'p2'} className={'mb-4 ml-4 font-[500] text-secondary'}>
            {status}
          </Typography>
          <div className={'space-y-4'}>
            {orders
              ?.filter((order) => order.status === status)
              ?.map((order) => (
                <Card
                  key={order.orderID}
                  {...order}
                  onClick={() => {
                    handleClick(order.orderID);
                  }}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
