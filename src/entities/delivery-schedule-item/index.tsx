import { type ReactNode } from 'react';

import parse from 'html-react-parser';

import Typography from '@/shared/components/typography';

interface IDeliveryScheduleItem {
  item: {
    title: string;
    text: string;
    icon: ReactNode;
  };
}

const DeliveryScheduleItem: React.FC<IDeliveryScheduleItem> = ({ item }) => {
  return (
    <div className='flex gap-4'>
      {item.icon}
      <div>
        <Typography variant='desc' className='mb-2 text-base font-semibold'>
          {item.title}
        </Typography>
        <div className='flex w-[220px] flex-col gap-1'>
          <Typography variant='desc' className='text-base font-medium text-secondary'>
            {parse(item.text)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DeliveryScheduleItem;
