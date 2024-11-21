'use client';

import AccordionVacancies from '@/entities/accordion-vacancies/accordion-vacancies';
import { Breadcrumbs } from '@/entities/breadcrumbs';
import Phone from '@/entities/phone';
import Typography from '@/shared/components/typography';
import { useGetContacts } from '@/shared/hooks/query/use-get-contacts';

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Вакансии', path: '/vacancies' },
];
const Home = () => {
  const { data } = useGetContacts();

  return (
    <main className='mx-auto mt-5 min-h-[calc(100vh-178px)] max-w-[1304px] px-4 pb-10 md:px-4'>
      <div className={'hidden md:block'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <Typography
        variant='h2'
        className='my-7 font-semibold max-md:mb-8 max-md:text-xl md:text-2xl'
      >
        Вакансии
      </Typography>
      <div
        className={'flex gap-10 max-md:flex-col-reverse max-md:justify-end max-md:gap-8 '}
      >
        <div className='basis-2/3'>
          <AccordionVacancies />
        </div>
        <div className='flex h-fit basis-1/3 flex-col gap-y-6 rounded-xl border-2 border-primary/10 p-10'>
          <Typography variant='desc' className='text-xl font-semibold max-md:text-lg'>
            Свяжитесь с нами
          </Typography>
          {data?.contacts?.[0].data && (
            <div>
              <Typography
                variant='desc'
                className='mb-3 text-base font-medium text-lightGrey3 max-md:text-sm'
              >
                Телефон
              </Typography>
              <Phone className='!text-xl !font-medium max-md:!text-lg' />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
