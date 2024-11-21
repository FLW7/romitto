import CardsShadowIcon from '@/assets/icons/cards-shadow.svg';
import ClockShadowIcon from '@/assets/icons/clock-shadow.svg';
import LocationShadowIcon from '@/assets/icons/location-shadow.svg';
import MoneyBagShadowShadowIcon from '@/assets/icons/money-bag-shadow.svg';
import DeliveryScheduleItem from '@/entities/delivery-schedule-item';

const icons = [
  <ClockShadowIcon key={0} width={42} height={42} className='min-w-[42px]' />,
  <LocationShadowIcon key={1} width={42} height={42} className='min-w-[42px]' />,
  <MoneyBagShadowShadowIcon key={2} width={42} height={42} className='min-w-[42px]' />,
  <CardsShadowIcon key={3} width={42} height={42} className='min-w-[42px]' />,
];

const DeliveryScheduleList: React.FC<{
  data: Array<{ title: string; text: string }>;
}> = ({ data }) => {
  return (
    <div className='flex flex-col gap-11'>
      {data?.map((item, key) => {
        return item?.text && item?.title ? (
          <DeliveryScheduleItem key={key} item={{ ...item, icon: icons[key] }} />
        ) : null;
      })}
    </div>
  );
};

export default DeliveryScheduleList;
