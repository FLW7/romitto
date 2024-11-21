import EventsTabs from '@/feature/events-tabs/events-tabs';
import EventsTabsMobile from '@/feature/events-tabs-mobile/events-tabs-mobile';
import Typography from '@/shared/components/typography';
import { useGetEvents } from '@/shared/hooks/query/use-get-events';
import useMediaQuery from '@/shared/hooks/use-media-query';

const EventsList = () => {
  const { data } = useGetEvents();

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className='mb-[100px] mt-[100px] max-md:mt-[50px]'>
      <Typography
        variant='desc'
        className='mb-8 font-semibold max-md:px-4 max-md:text-xl md:text-2xl'
      >
        Мероприятия
      </Typography>
      {isDesktop ? <EventsTabs data={data} /> : <EventsTabsMobile data={data} />}
    </div>
  );
};

export default EventsList;
