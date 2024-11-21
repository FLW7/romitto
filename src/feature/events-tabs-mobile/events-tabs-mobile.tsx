import { useEffect, useState } from 'react';

import MobileSelect from '../mobile-select/mobile-select';

import EventContentItem from '@/entities/event-content-item/event-content-item';
import MobileCategoriesEvents from '@/entities/mobile-categories-events/mobile-categories-events';
import { type IEventItem, type IEvents } from '@/shared/api/get-events';
import Typography from '@/shared/components/typography';
import { formatDateMonthYear } from '@/shared/lib/format-date-month-year';

const EventsTabsMobile: React.FC<{ data?: IEvents[] }> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<IEvents | undefined>(data?.[0]);

  const setItem = (id: number) => {
    data &&
      setSelectedItem(
        Object.values(data).find((item) => item.id.toString() === id.toString()),
      );
  };

  const setCategory = (id: number) => {
    switch (id) {
      case 0: {
        setActiveCategory('all');
        break;
      }
      case 1: {
        setActiveCategory('show');
        break;
      }
      case 2: {
        setActiveCategory('master');
        break;
      }

      default: {
        break;
      }
    }
  };

  const categories = [
    { id: 1, name: 'Все мероприятия', value: 'all' },
    { id: 2, name: 'Шоу-программы', value: 'show' },
    { id: 3, name: 'Мастер-классы', value: 'master' },
  ];

  useEffect(() => {
    if (data) {
      const fisrtsKey = Object.keys(data)[0];

      const firstItem = data?.[Number(fisrtsKey)];

      setSelectedItem(firstItem);
    }
  }, [data]);

  const currentArr = (
    selectedItem?.[activeCategory as keyof IEvents] as IEventItem[]
  )?.map((item) => {
    return { ...item, key: `${item.date.split('-')[0]}-${item.date.split('-')[1]}` };
  });

  const groupedItems: Record<string, IEventItem[]> = {};

  for (const item of currentArr || []) {
    const groupName = item.key;
    const existedRoom = groupedItems[groupName];

    groupedItems[groupName] = existedRoom ? [...existedRoom, item] : [item];
  }

  return (
    data && (
      <div>
        <MobileSelect
          title='Ресторан по адресу'
          defaultValue={Object.values(data)?.[0]?.id.toString()}
          items={Object.values(data).map((item) => {
            return { ...item, name: item.Name };
          })}
          onChange={setItem}
        />
        <MobileCategoriesEvents
          categories={categories}
          activeCategory={categories.findIndex((item) => item.value === activeCategory)}
          className='mt-6 px-3'
          onClick={setCategory}
        />
        <div className='mb-6 mt-10 flex flex-col gap-y-10 px-4'>
          {Object.keys(groupedItems).map((item, key) => {
            return (
              <div key={key}>
                <Typography variant='h4' className='text-pink uppercase'>
                  {formatDateMonthYear(new Date(item))}
                </Typography>
                {groupedItems?.[item]?.map((el) => {
                  return <EventContentItem key={el.id} item={el} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default EventsTabsMobile;
