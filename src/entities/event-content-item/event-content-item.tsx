import { type IEventItem } from '@/shared/api/get-events';
import Typography from '@/shared/components/typography';
import { formatDate } from '@/shared/lib/format-date';

const EventContentItem: React.FC<{ item: IEventItem }> = ({ item }) => {
  return (
    item && (
      <div>
        {/* <Typography variant='h4' className='uppercase text-main'>
        НОЯБРЬ 2023
      </Typography> */}
        <ul className='mt-3 flex flex-col gap-[10px]'>
          <li className='flex gap-2 text-primary'>
            <Typography
              variant='desc'
              className='whitespace-nowrap text-base font-semibold'
            >
              {formatDate(new Date(item.date))}
            </Typography>{' '}
            -{' '}
            <Typography variant='desc' className='text-base font-normal'>
              {item.text}
            </Typography>
          </li>
        </ul>
      </div>
    )
  );
};

export default EventContentItem;
