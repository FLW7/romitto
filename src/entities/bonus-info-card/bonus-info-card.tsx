import { type ReactNode } from 'react';

import parse from 'html-react-parser';

import Typography from '@/shared/components/typography';

const BonusInfoCard: React.FC<{
  items: Array<{ icon: ReactNode; title: string; text: string }>;
}> = ({ items }) => {
  return (
    <div className='flex flex-col gap-y-10'>
      {items.map((el, key) => {
        return (
          el.text && (
            <div key={key} className='h-[184px] w-[300px]'>
              {el.icon}
              <Typography
                variant='desc'
                className='mb-3 mt-5 text-base font-semibold text-primary'
              >
                {el.title}
              </Typography>

              <Typography variant='desc' className='text-base font-medium text-secondary'>
                {parse(el.text)}
              </Typography>
            </div>
          )
        );
      })}
    </div>
  );
};

export default BonusInfoCard;
