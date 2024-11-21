'use client';

import { Breadcrumbs } from '@/entities/breadcrumbs';
import Typography from '@/shared/components/typography';
import { useGetPartnership } from '@/shared/hooks/query/use-get-partnership';
import ContactsBlock from '@/widgets/contacts-block/contacts-block';
import CooperationBlock from '@/widgets/cooperation-block/cooperation-block';

const breadcrumbs = [
  { name: 'Главная', path: '/' },
  { name: 'Контакты', path: '/contacts' },
];

const Home = () => {
  const { data } = useGetPartnership();

  return (
    data && (
      <main className={'mx-auto mt-5 max-w-[1304px] pb-10 md:px-4'}>
        <div className={'hidden md:block'}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <div className='mt-6 flex min-h-[calc(100vh-178px)] flex-col gap-y-[60px]'>
          {data.org?.filter(
            (item) => item.requisites !== '<p><br></p>' && item.IsHaveLocalOrder === '1',
          )?.length > 0 && (
            <div>
              <Typography variant='h1' className='mb-8 max-md:px-4'>
                Контакты
              </Typography>
              <ContactsBlock
                data={data.org?.filter(
                  (item) =>
                    item.requisites !== '<p><br></p>' && item.IsHaveLocalOrder === '1',
                )}
              />
            </div>
          )}
          {data.data?.filter((item) => item.descr !== '<p><br></p>')?.length > 0 && (
            <div>
              <Typography variant='h1' className='mb-8 max-md:px-4'>
                Сотрудничество
              </Typography>
              <CooperationBlock
                data={data.data?.filter((item) => item.descr !== '<p><br></p>')}
              />
            </div>
          )}
        </div>
      </main>
    )
  );
};

export default Home;
