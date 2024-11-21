import { LkMobOrderHistory } from '@/entities/lk-mob-order-history';
import { LkTableOrderHistory } from '@/entities/lk-table-order-history';
import Typography from '@/shared/components/typography';
import { LkConfig } from '@/widgets/lk/config';
import { titlesArray } from '@/widgets/lk/order-history/mock';
import { useGetOrders } from '@/widgets/lk/order-history/model/use-get-orders';

export function OrderHistory() {
  const { data, isPending, isLoading } = useGetOrders();
  const loading = isPending || isLoading;

  return (
    <div>
      <Typography variant={'h6'} className={'mb-5 ml-4 lg:ml-12'}>
        {LkConfig.order.title}
      </Typography>

      <div className={'hidden lg:block'}>
        <LkTableOrderHistory tableData={data} titlesArr={titlesArray} loading={loading} />
      </div>

      <div className={'block lg:hidden'}>
        <LkMobOrderHistory orders={data} loading={loading} />
      </div>
    </div>
  );
}
