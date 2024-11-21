import { useState } from 'react';

import Typography from '../../shared/components/typography';

import { CustomWheel } from '@/feature/custom-wheel-two';
import { formatDate } from '@/shared/lib/format-date';

interface DatePickerProps {
  date: { date: string; time: string } | undefined;
  onDateChange: (newDate: { date: string; time: string }) => void;
  days: string[];
  hours: string[];
  isTitle?: boolean;
  // setCurrentHours?: Dispatch<SetStateAction<string[]>>;
  timesArray?: string[][];
}

const TimePickerOrder: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  days,
  hours,
  isTitle,
  timesArray,
}) => {
  const formattedDays = days.map((item) => formatDate(new Date(item)));

  const [activeIndexDay, setActiveIndexDay] = useState(
    formattedDays?.findIndex(
      (el) => el === formatDate(new Date(date?.date ?? new Date())),
    ) > -1
      ? formattedDays?.findIndex(
          (el) => el === formatDate(new Date(date?.date ?? new Date())),
        )
      : 0,
  );

  const handleChange = (type: string, newIndex: number) => {
    console.log(date);

    const newDate: { date: string; time: string } = {
      date: date?.date ?? '',
      time: hours[0],
    };

    switch (type) {
      case 'day': {
        setActiveIndexDay(newIndex);
        newDate.date = days[newIndex];
        if (timesArray) {
          newDate.time = timesArray[newIndex][0];
        }
        break;
      }
      case 'time': {
        newDate.time = hours[newIndex];

        break;
      }
    }

    newDate && onDateChange(newDate);
  };

  const findHoursIndex = () => {
    // eslint-disable-next-line @typescript-eslint/prefer-includes, unicorn/prefer-includes

    if (date?.date && date?.time)
      return hours?.includes(date.time) ? hours?.indexOf(date.time) + 1 : 1;
  };

  console.log(hours);

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
          data={formattedDays}
          selected={activeIndexDay + 1}
          onDateChange={handleChange}
        />
        <CustomWheel
          type='time'
          data={hours}
          selected={findHoursIndex() ?? 1}
          onDateChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TimePickerOrder;
