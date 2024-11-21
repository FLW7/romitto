import { type ReactNode } from 'react';

import parse from 'html-react-parser';

import Typography from '@/shared/components/typography';

interface IDeliveryInfoCardProps {
  item: {
    title: string;
    text: string;
    icon: ReactNode;
  };
}

const DeliveryInfoCard: React.FC<IDeliveryInfoCardProps> = ({ item }) => {
  return (
    <div className='flex max-w-[300px] basis-1/4 flex-col'>
      <div className='mb-[22px]'>{item.icon}</div>
      <Typography variant='desc' className='mb-3 text-base font-semibold'>
        {item.title}
      </Typography>
      <Typography variant='desc' className='text-base text-secondary'>
        {parse(item.text)}
      </Typography>
    </div>
  );
};

export default DeliveryInfoCard;
