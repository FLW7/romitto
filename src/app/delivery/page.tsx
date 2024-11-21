'use client';

/* eslint-disable unicorn/prefer-at */

import { useEffect } from 'react';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import AccordionQuestions from '@/entities/accordion-qustions/accordion-questions';
import { Breadcrumbs } from '@/entities/breadcrumbs';
import DeliveryCardsList from '@/feature/delivary-cards-list';
import DeliveryInfoCardsList from '@/feature/delivary-info-cards-list';
import DeliveryScheduleList from '@/feature/delivery-schedule-list';
import Typography from '@/shared/components/typography';
import { useGetShiping } from '@/shared/hooks/query/use-get-shiping';
import { useDelivery } from '@/shared/state/delivery';
import YandexMap from '@/widgets/yandex-map';

export default function Home() {
  const breadcrumbs = [
    { name: 'Главная', path: '/' },
    { name: 'Доставка и оплата', path: '/delivery' },
  ];

  const { data } = useGetShiping();
  const { setStep } = useDelivery();
  const router = useRouter();

  useEffect(() => {
    setStep('rest');
  }, []);

  return (
    data?.data && (
      <main className={'mx-auto mt-5'}>
        <div className={'mx-auto hidden max-w-[1304px] p-4 px-4 md:block  md:px-4'}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className='mt-6 min-h-[calc(100vh-178px)] '>
          <div className='mx-auto max-w-[1304px] p-4  md:px-4'>
            <div className='flex items-center gap-3'>
              <ChevronLeft
                size={24}
                className='md:hidden'
                onClick={() => {
                  router.back();
                }}
              />
              <Typography variant='h1'>Доставка и оплата</Typography>
            </div>
            <DeliveryCardsList
              data={[...data?.data?.slice(0, 3), ...data?.data?.slice(4, 5)]}
            />
            <DeliveryInfoCardsList data={data?.data?.slice(5, 9)} />
          </div>
          <div className='mx-auto mb-[120px] mt-[50px] flex max-w-[1304px] gap-[110px] px-4 max-lg:flex-col-reverse max-lg:gap-[50px] max-md:mb-[100px] md:px-4'>
            <div className='p-4'>
              <DeliveryScheduleList data={data?.data?.slice(9, -1)} />
            </div>
            <div className='bg-gray-300 grid h-[600px] w-full'>
              <YandexMap zoom={10} defaultStep={'rest'} />
            </div>
          </div>
          {(data?.data.at(-1)?.qa?.length > 0 ||
            data?.data?.at(-1)?.conditions?.length > 0) && (
            <div
              className={
                'min-w-full max-w-[1304px] bg-[#F6F8F7] px-4 py-20 max-md:pb-[100px] md:px-4'
              }
            >
              <div className='mx-auto mt-5 flex max-w-[1304px] gap-16 max-lg:flex-col'>
                {data?.data.at(-1)?.qa?.length > 0 && (
                  <div className='w-full'>
                    <Typography variant='h1' className='mb-5 max-md:text-xl'>
                      Вопрос-ответ
                    </Typography>
                    <AccordionQuestions
                      data={data?.data
                        ?.at(-1)
                        ?.qa?.map(
                          (item: { question: string; answer: string; id: string }) => {
                            return { title: item.question, descr: item.answer };
                          },
                        )}
                    />
                  </div>
                )}
                {data?.data?.at(-1)?.conditions?.length > 0 && (
                  <div className='w-full'>
                    <Typography variant='h1' className='mb-5 max-md:text-xl'>
                      Условия доставки
                    </Typography>
                    <AccordionQuestions
                      data={data?.data
                        ?.at(-1)
                        ?.conditions?.map(
                          (item: { question: string; answer: string; id: string }) => {
                            return { title: item.question, descr: item.answer };
                          },
                        )}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    )
  );
}
