'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import DocIcon from '@/assets/icons/doc.svg';
import { Breadcrumbs } from '@/entities/breadcrumbs';
import Typography from '@/shared/components/typography';

const LegalPage = () => {
  const breadcrumbs = [
    { name: 'Главная', path: '/' },
    { name: 'Правовая информация', path: '/legal' },
  ];

  const router = useRouter();

  const links = [
    {
      name: 'Политика конфиденциальности и обработки персональных данных',
      url: 'https://kuksuramen.ru/storage/%D0%9A%D1%83%D0%BA%D1%81%D1%83%D0%A0%D0%B0%D0%BC%D0%B5%D0%BD_%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8.docx',
    },
    {
      name: 'Пользовательское соглашение',
      url: 'https://kuksuramen.ru/storage/%D0%9A%D1%83%D0%BA%D1%81%D1%83%D0%A0%D0%B0%D0%BC%D0%B5%D0%BD_%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5.docx',
    },
  ];
  // const links = [
  //   {
  //     name: 'Пользовательское соглашение',
  //     url: 'https://docs.google.com/document/d/1kD1TrOjuIhVr8EM1SGEBOGWeq2p06ENR/edit?usp=sharing&ouid=116964996145834812882&rtpof=true&sd=true',
  //   },
  //   {
  //     name: 'Политика конфиденциальности',
  //     url: 'https://docs.google.com/document/d/1p2ZapmXXTMsbSgqSFfgL2U5MtxkuxGc_/edit?usp=sharing&ouid=116964996145834812882&rtpof=true&sd=true',
  //   },
  // ];

  return (
    <main className={'mx-auto mt-5 max-w-[1440px] pb-10 md:px-4'}>
      <div className={'hidden md:block'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className='mt-6 min-h-[calc(100vh-178px)] px-4'>
        <div className='flex items-center gap-x-2'>
          <ChevronLeft
            color='white'
            size={20}
            className='md:hidden'
            onClick={() => {
              router.back();
            }}
          />
          <Typography variant='desc' className='!text-2xl font-semibold max-md:!text-xl'>
            Правовая информация
          </Typography>
        </div>
        <div className='mt-8 flex flex-col gap-y-5'>
          {links.map((item, index) => (
            <div key={index} className='flex gap-x-1'>
              <DocIcon className='h-8 w-8 max-md:h-6 max-md:w-6 ' />
              <div>
                <Typography
                  variant='desc'
                  className='!text-xl !font-semibold max-md:!text-base'
                >
                  {item.name}
                </Typography>
                <Link
                  href={item.url}
                  target='_blank'
                  className='!text-base !font-semibold text-main max-md:!text-sm'
                >
                  Просмотр
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LegalPage;
