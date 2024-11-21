import { useState } from 'react';

import Typography from '../../shared/components/typography';

import { CustomWheel } from '@/feature/custom-wheel-two';
import { dateFormatter, parseDate } from '@/widgets/time-picker/lib/generate-days';

interface DatePickerProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  days: string[];
  hours: string[];
  isTitle?: boolean;
}

const TimePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  days,
  hours,
  isTitle,
}) => {
  const [activeIndexDay, setActiveIndexDay] = useState(
    days?.findIndex((el) => el === dateFormatter(date)) || 0,
  );

  const handleChange = (type: string, newIndex: number) => {
    let newDate;

    switch (type) {
      case 'day': {
        setActiveIndexDay(newIndex);
        const getDate = days[newIndex];

        newDate = parseDate(getDate, date.getHours(), date.getMinutes());
        break;
      }
      case 'time': {
        const [hour, minute] = hours[newIndex].split(':');

        newDate = parseDate(
          days[activeIndexDay],
          Number.parseInt(hour),
          Number.parseInt(minute),
        );

        break;
      }
    }

    newDate && onDateChange(newDate);
  };

  const findHoursIndex = () => {
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return hours.indexOf(`${hour}:${minutes}`) + 1;
  };

  return (
    <div>
      {isTitle && (
        <Typography
          variant='h1'
          className='mb-10 text-center max-md:mb-6 max-md:text-start max-md:text-lg'
        >
          Выберите дату и время
        </Typography>
      )}
      <div className='flex justify-between overflow-hidden py-10'>
        <CustomWheel
          type='day'
          data={days}
          selected={activeIndexDay + 1}
          onDateChange={handleChange}
        />
        <CustomWheel
          type='time'
          data={hours}
          selected={findHoursIndex() || 1}
          onDateChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TimePicker;
