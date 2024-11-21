'use client';

import { Breadcrumbs } from '@/entities/breadcrumbs';
import { LkConfig } from '@/widgets/lk/config';
import { LkHeader } from '@/widgets/lk/lk-header';
import { OrderHistory } from '@/widgets/lk/order-history';
import { PersonalInformation } from '@/widgets/lk/personal-Information';
import { DetailOrderDynamic } from '@/widgets/modal/detail-order/detail-order.dynamic';
import { LogoutModalDynamic } from '@/widgets/modal/logout/logout-modal.dynamic';

export default function Home() {
  return (
    <main className={'mx-auto mt-4 max-w-[1304px] md:my-10 md:px-[20px]'}>
      <div className={'hidden md:block'}>
        <Breadcrumbs breadcrumbs={LkConfig.breadcrumbs} />
      </div>

      <LkHeader />
      <PersonalInformation />
      <OrderHistory />

      <LogoutModalDynamic />

      <DetailOrderDynamic />
    </main>
  );
}
