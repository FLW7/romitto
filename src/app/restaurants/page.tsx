'use client';

import { useEffect } from 'react';

import { Breadcrumbs } from '@/entities/breadcrumbs';
import Typography from '@/shared/components/typography';
import { MAP_DEFAULT } from '@/shared/const/map';
import { useDelivery } from '@/shared/state/delivery';
import { DetailRestDynamic } from '@/widgets/modal/detail-rest/detail-rest.dynamic';
import { CONFIG } from '@/widgets/restaurants/config';
import { RestLists } from '@/widgets/restaurants/rest-lists';
import YandexMap from '@/widgets/yandex-map';

export default function Home() {
  const { setStep } = useDelivery();

  useEffect(() => {
    setStep('pickup');
  }, []);

  return (
    <main
      className={
        'mx-auto mt-4 max-w-[1304px] space-y-6 p-4 sm:p-0 sm:px-[20px] md:mb-20 md:mt-5'
      }
    >
      <div className={'hidden md:block'}>
        <Breadcrumbs breadcrumbs={CONFIG.breadcrumbs} />
      </div>

      <Typography variant={'h1'}>{CONFIG.title}</Typography>

      <div className={'grid gap-4 sm:grid-cols-2 lg:h-[calc(100vh-300px)]'}>
        <RestLists />

        <div
          className={
            'sticky top-10  hidden h-[calc(100vh-300px)] overflow-hidden rounded-[12px] sm:grid'
          }
        >
          <YandexMap zoom={MAP_DEFAULT.zoom} defaultStep={'rest'} />
        </div>
      </div>

      <DetailRestDynamic />
    </main>
  );
}
