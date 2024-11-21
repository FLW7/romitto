'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import QuestionCardsImage from '@/assets/icons/question-cards.svg';
import AccordionQuestions from '@/entities/accordion-qustions/accordion-questions';
import { Breadcrumbs } from '@/entities/breadcrumbs';
import BonusCards from '@/feature/bonus-cards/bonus-cards';
import BonusCarousel from '@/feature/bonus-carousel/bonus-carousel';
import Typography from '@/shared/components/typography';
import { useGetBonusesProgram } from '@/shared/hooks/query/use-get-bonuses-program';

const Home = () => {
  const breadcrumbs = [
    { name: 'Главная', path: '/' },
    { name: 'Бонусная программа', path: '/bonus' },
  ];

  const { data } = useGetBonusesProgram();
  const router = useRouter();

  return (
    <main className='max-md:h-auto md:min-h-[calc(100vh-178px)]'>
      <div className={'mx-auto mt-5 max-w-[1304px]'}>
        <div className={'hidden px-4 md:block md:px-4'}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className='mb-[120px] max-md:mb-[80px]'>
          <div className='flex items-center gap-3 px-4'>
            <ChevronLeft
              size={24}
              className='md:hidden'
              onClick={() => {
                router.back();
              }}
            />
            <Typography variant='h1' className='max-md:text-xl md:mt-6 '>
              Бонусная программа
            </Typography>
          </div>
          <BonusCarousel data={data?.data?.slice(0, 8)} />
        </div>
      </div>
      <div className='mb-[120px] max-md:mb-[100px]'>
        <BonusCards />
      </div>
      {data?.data?.at(-1)?.blocks?.length > 0 && (
        <div
          className={
            'mx-auto max-w-[1304px] px-4 max-md:min-h-[400px] max-md:pb-[100px] md:min-h-[700px] md:px-4'
          }
        >
          <Typography variant='h1' className='max-md:text-xl'>
            Часто задаваемые вопросы
          </Typography>
          <div className='mt-5 flex items-start gap-5'>
            <QuestionCardsImage
              width={730}
              height={370}
              className={
                'h-auto min-h-[370px] min-w-[730px] max-[1300px]:min-h-[265px] max-[1300px]:min-w-[530px] max-lg:hidden'
              }
            />

            <AccordionQuestions data={data?.data?.at(-1)?.blocks} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
