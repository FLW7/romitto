import Image from 'next/image';
import Link from 'next/link';

import AppStore from '@/assets/icons-yap/app-store.svg';
import GooglePlay from '@/assets/icons-yap/google-play.svg';
import PlugImage from '@/assets/image/plug.png';
import QRImage from '@/assets/image/qr.png';
import Typography from '@/shared/components/typography';

const AdAppContent = () => {
  const title = 'В приложении быстрее';
  const list = [
    { id: 1, name: 'Бонус за установку' },
    { id: 2, name: 'Уведомления о заказе' },
    { id: 3, name: 'Уникальные акции' },
  ];
  const qrDescription =
    'Наведите камеру телефона и перейдите по ссылке, чтобы установить приложение.';

  return (
    <div className='flex max-md:flex-col-reverse'>
      <Image src={PlugImage} alt='' className='rounded-l-[22px] object-cover' />
      <div className='max-md:px-4 md:p-8'>
        <Typography
          variant='desc'
          className='mb-3 !text-[28px] !font-semibold max-md:pt-6 max-md:!text-[22px]'
        >
          {title}
        </Typography>
        <ul className='mb-7 ml-[24px] max-md:mb-4'>
          {list?.map((item, key) => (
            <li className='list-disc' key={key}>
              <Typography
                variant='desc'
                className='!text-lg font-normal max-md:!text-base'
              >
                {item.name}
              </Typography>
            </li>
          ))}
        </ul>
        <div className='mb-7 flex gap-2 max-md:mb-[18px]'>
          <Link href='https://sellkit.cc/cases/Fishks/index.html'>
            <AppStore className='h-[50px] w-[170px] max-md:h-[44px] max-md:w-[152px]' />
          </Link>
          <Link href='https://sellkit.cc/cases/Fishks/index.html'>
            <GooglePlay className='h-[50px] w-[170px] max-md:h-[44px] max-md:w-[152px]' />
          </Link>
        </div>
        <div className='flex items-center gap-x-5 max-md:hidden'>
          <Image
            src={QRImage}
            alt='qr'
            width={140}
            height={140}
            className='rounded-xl shadow-qrShadow'
          />
          <Typography
            variant='desc'
            className='w-[192px] !text-base font-normal text-[#26262680]'
          >
            {qrDescription}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AdAppContent;
