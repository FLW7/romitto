'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/accordion';

const AccordionQuestions: React.FC<{
  data: Array<{ title: string; descr: string }>;
}> = ({ data }) => {
  return (
    data && (
      <Accordion type='single' collapsible className='flex w-full flex-col gap-y-3'>
        {data?.map((item: { title: string; descr: string }, key: number) => {
          return (
            item.title &&
            item.descr && (
              <AccordionItem key={key} value={key.toString()} className='bg-bgSecondary'>
                <AccordionTrigger className='text-start'>{item.title}</AccordionTrigger>
                <AccordionContent>
                  <article className='prose max-w-full'>
                    {<div dangerouslySetInnerHTML={{ __html: item.descr }}></div>}
                  </article>
                  {/* <div>{parse(item.descr)}</div> */}
                </AccordionContent>
              </AccordionItem>
            )
          );
        })}
      </Accordion>
    )
  );
};

export default AccordionQuestions;
