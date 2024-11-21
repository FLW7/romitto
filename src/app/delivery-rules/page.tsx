'use client';

import { Breadcrumbs } from '@/entities/breadcrumbs';
import Typography from '@/shared/components/typography';
import { useGetDeliveryRules } from '@/shared/hooks/query/use-get-delivery-rules';

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Условия доставки', path: '/deliveryRules' },
];

export default function Home() {
  const { data } = useGetDeliveryRules();

  return (
    data && (
      <main className={'mx-auto mt-5 max-w-[1304px] pb-10 md:px-4'}>
        <div className={'hidden md:block'}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className='mt-[50px] min-h-[calc(100vh-178px)] max-md:mt-[0px]'>
          <div className='flex flex-col max-md:p-4'>
            <div className='mb-8 flex gap-x-8'>
              <Typography variant='h1'>Условия доставки</Typography>
            </div>

            <article className='prose max-w-full'>
              {<div dangerouslySetInnerHTML={{ __html: data?.data?.html }}></div>}
            </article>
          </div>
        </div>
      </main>
    )
  );
}
