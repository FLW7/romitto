'use client';

import { useEffect, useState } from 'react';

import styles from './style.module.css';

import CooperationContentItem from '@/entities/cooperation-content-item/cooperation-content-item';
import AddressTabs from '@/feature/address-tabs/address-tabs';
import MobileSelect from '@/feature/mobile-select/mobile-select';
import { Tabs, TabsContent } from '@/shared/components/tabs';
import useMediaQuery from '@/shared/hooks/use-media-query';

const CooperationBlock: React.FC<{
  data: Array<{
    id: string;
    descr: string;
    title: string;
  }>;
}> = ({ data }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [selectedItem, setSelectedItem] = useState<string | undefined>();

  useEffect(() => {
    setSelectedItem(data?.[0]?.id);
  }, [data]);

  return data ? (
    isDesktop ? (
      <Tabs defaultValue='0' className='flex w-full gap-5'>
        <AddressTabs
          data={data.map((item) => {
            return { ...item, name: item.title };
          })}
        />
        <div className={styles.rightBlock}>
          {data?.map((item, key) => (
            <TabsContent
              key={key}
              value={key.toString()}
              className={styles.tabsContentBlock}
            >
              <CooperationContentItem text={item.descr} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    ) : (
      <>
        <MobileSelect
          title='Отдел'
          items={data.map((item) => {
            return { ...item, name: item.title };
          })}
          onChange={setSelectedItem}
          defaultValue={data[0]?.id.toString()}
        />
        <div className='mb-6 mt-0 flex flex-col gap-y-10 px-4'>
          <CooperationContentItem
            text={
              data?.find((item) => String(item.id) === String(selectedItem))?.descr ?? ''
            }
          />
        </div>
      </>
    )
  ) : null;
};

export default CooperationBlock;
