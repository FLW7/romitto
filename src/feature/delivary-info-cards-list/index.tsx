import BellIcon from '@/assets/icons/bell.svg';
import CallIcon from '@/assets/icons/call.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import LunchIcon from '@/assets/icons/lunch.svg';
import DeliveryInfoCard from '@/entities/delivary-info-card';
const icons = [
  <ClockIcon key={0} width={41} height={41} />,
  <LunchIcon key={1} width={41} height={41} />,
  <BellIcon key={2} width={41} height={41} />,
  <CallIcon key={3} width={41} height={41} />,
];

const DeliveryInfoCardsList: React.FC<{
  data: Array<{ title: string; text: string }>;
}> = ({ data }) => {
  return (
    <div className='mt-[50px] flex justify-between gap-5 max-lg:flex-col max-lg:gap-11'>
      {data?.map((item, key) => {
        return item?.title && item?.text ? (
          <DeliveryInfoCard key={key} item={{ ...item, icon: icons[key] }} />
        ) : null;
      })}
    </div>
  );
};

export default DeliveryInfoCardsList;
