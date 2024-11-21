'use client';

import { useEffect, useState } from 'react';

import styles from './style.module.css';

import ContactContentItem from '@/entities/contact-content-item/contact-content-item';
import AddressTabs from '@/feature/address-tabs/address-tabs';
import MobileSelect from '@/feature/mobile-select/mobile-select';
import { Tabs, TabsContent } from '@/shared/components/tabs';
import useMediaQuery from '@/shared/hooks/use-media-query';

const ContactsBlock: React.FC<{
  data: Array<{
    id: string;
    Name: string;
    requisites: string;
  }>;
}> = ({ data }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [selectedItem, setSelectedItem] = useState<number | undefined>(0);

  useEffect(() => {
    setSelectedItem(Number(data[0]?.id));
  }, [data]);

  return (
    data &&
    (isDesktop ? (
      <Tabs defaultValue='0' className='flex w-full gap-5'>
        <AddressTabs
          data={data?.map((item: { Name: string; id: string; requisites: string }) => {
            return { ...item, name: item.Name };
          })}
        />
        <div className={styles.rightBlock}>
          {data?.map(
            (item: { Name: string; id: string; requisites: string }, key: number) => (
              <TabsContent
                key={key}
                value={key.toString()}
                className={styles.tabsContentBlock}
              >
                <ContactContentItem text={item?.requisites} />
              </TabsContent>
            ),
          )}
        </div>
      </Tabs>
    ) : (
      <>
        <MobileSelect
          title='Ресторан по адресу'
          items={data?.map((item) => {
            return { ...item, name: item.Name };
          })}
          onChange={setSelectedItem}
          defaultValue={data[0]?.id}
        />
        <div className='mb-6 mt-0 flex flex-col gap-y-10 px-4'>
          <ContactContentItem
            text={
              data?.find((item) => Number(item.id) === Number(selectedItem))?.requisites
            }
          />
        </div>
      </>
    ))
  );
};

export default ContactsBlock;
