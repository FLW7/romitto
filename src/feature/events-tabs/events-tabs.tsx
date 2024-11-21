/* eslint-disable unicorn/consistent-function-scoping */
import { useEffect, useState } from 'react';

import styles from './style.module.css';

import EventContentItem from '@/entities/event-content-item/event-content-item';
import TabTrigger from '@/entities/tab-trigger/tab-trigger';
import { type IEventItem, type IEvents } from '@/shared/api/get-events';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/tabs';
import Typography from '@/shared/components/typography';
import { formatDateMonthYear } from '@/shared/lib/format-date-month-year';

const EventsTabs: React.FC<{ data?: IEvents[] }> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<IEvents | undefined>();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const setItem = (id: string) => {
    data &&
      setSelectedItem(
        Object.values(data).find((item) => item.id.toString() === id.toString()),
      );
  };

  useEffect(() => {
    data && setItem(Object.values(data)[0].id);
  }, [data]);

  const currentArr = (
    selectedItem?.[selectedCategory as keyof IEvents] as IEventItem[]
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
      <Tabs
        defaultValue={Object.values(data)[0].id}
        onValueChange={setItem}
        className='flex w-full gap-5 rounded-none'
      >
        <TabsList
          className={
            'flex h-fit w-[480px] flex-col items-start justify-start overflow-hidden rounded-xl border border-grey bg-none p-0'
          }
        >
          {Object.values(data)?.map((item) => {
            return (
              (item?.all?.length > 0 ||
                item?.show?.length > 0 ||
                item?.master?.length > 0) && (
                <TabTrigger
                  key={item.id}
                  value={item.id.toString()}
                  className='justify-start rounded-none px-[19px] py-[24px] text-base'
                >
                  {item.Name}
                </TabTrigger>
              )
            );
          })}
        </TabsList>

        <div className={styles.rightBlock}>
          <Tabs
            defaultValue='all'
            onValueChange={setSelectedCategory}
            className='relative'
            orientation='horizontal'
          >
            <div className='relative'>
              <TabsList
                className={`flex items-start justify-start gap-x-6 rounded-none bg-white px-6 py-0`}
              >
                <TabsTrigger
                  value={'all'}
                  className={`justify-start rounded-none px-0 text-base ${styles.rightTab}`}
                >
                  Все мероприятия
                </TabsTrigger>
                {(selectedItem?.show?.length ?? 0) > 0 && (
                  <TabsTrigger
                    value={'show'}
                    className={`justify-start rounded-none px-0 text-base ${styles.rightTab}`}
                  >
                    Шоу-программы
                  </TabsTrigger>
                )}
                {(selectedItem?.master?.length ?? 0) > 0 && (
                  <TabsTrigger
                    value={'master'}
                    className={`justify-start rounded-none px-0 text-base ${styles.rightTab}`}
                  >
                    Мастер-классы
                  </TabsTrigger>
                )}
              </TabsList>
              <span className={styles.rightTabsBottomLine}></span>
            </div>
            <TabsContent value={selectedCategory} className={styles.tabsContentBlock}>
              {Object.keys(groupedItems).map((item, key) => {
                return (
                  <div key={key}>
                    <Typography variant='h4' className='uppercase text-main'>
                      {formatDateMonthYear(new Date(item))}
                    </Typography>
                    {groupedItems?.[item]?.map((el) => (
                      <EventContentItem key={el.id} item={el} />
                    ))}
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>
      </Tabs>
    )
  );
};

export default EventsTabs;
