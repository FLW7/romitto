'use client';

import { Breadcrumbs } from '@/entities/breadcrumbs';
import NewsBlock from '@/widgets/news-block';

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Новости', path: '/news' },
];

export default function Home() {
  return (
    <main className={'mx-auto mt-5 max-w-[1304px] pb-10 md:px-4'}>
      <div className={'hidden md:block'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className='mt-[50px] min-h-[calc(100vh-178px)] max-md:mt-[0px]'>
        <NewsBlock />
      </div>
    </main>
  );
}
