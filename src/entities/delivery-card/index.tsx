import parse from 'html-react-parser';

import Typography from '@/shared/components/typography';

const DeliveryCard: React.FC<{
  title: string;
  desc: string;
  additionalText?: string;
}> = ({ title, desc, additionalText }) => {
  return (
    <div className='flex w-full flex-col items-center rounded-lg bg-bgSecondary p-7 text-center shadow-cardLk'>
      <Typography variant='desc' className='text-primary max-lg:text-base lg:text-lg'>
        {title}
      </Typography>
      <Typography
        variant='desc'
        className='mt-3 font-semibold text-primary max-lg:text-xl md:mt-1 lg:text-2xl'
      >
        {parse(desc)}
      </Typography>
    </div>
  );
};

export default DeliveryCard;
