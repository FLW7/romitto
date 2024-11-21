'use client';

import { Breadcrumbs } from '@/entities/breadcrumbs';
import PromotionsBlock from '@/widgets/promotions';

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Акции', path: '/promotions' },
];

export default function Home() {
  return (
    <main className={'mx-auto mt-5 max-w-[1304px] pb-10 md:px-4'}>
      <div className={'hidden md:block'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className='min-h-[calc(100vh-178px)]'>
        <PromotionsBlock />
      </div>
    </main>
  );
}
