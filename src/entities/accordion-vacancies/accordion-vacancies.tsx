'use client';

import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/accordion';
import { Button } from '@/shared/components/button';
import { useGetVacancies } from '@/shared/hooks/query/use-get-vacancies';

const AccordionVacancies = () => {
  const { data: vacancies } = useGetVacancies();

  return (
    <Accordion type='single' collapsible className='flex w-full flex-col gap-y-3'>
      {vacancies?.data?.map((item) => {
        return (
          <AccordionItem key={item.id} value={item.id.toString()}>
            <AccordionTrigger>{item?.title}</AccordionTrigger>
            <AccordionContent>
              <article className='prose max-w-full'>
                {<div dangerouslySetInnerHTML={{ __html: item?.descr }}></div>}
              </article>
              {/* <div>{parse(item?.descr ?? '')}</div> */}
              <Link href={'tel:79022842745'} target='_blank'>
                <Button className='mt-11 w-[340px] max-md:mt-8 max-md:w-full'>
                  Записаться на собеседование
                </Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default AccordionVacancies;
