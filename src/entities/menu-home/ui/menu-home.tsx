import { motion } from 'framer-motion';
import Link from 'next/link';

import Apple from '@/assets/icons/apple.svg';
import Google from '@/assets/icons/google.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import Marker from '@/assets/icons/marker.svg';
import Typography from '@/shared/components/typography';
import { ROUTES } from '@/shared/const/routes';
import { useCartOpen } from '@/widgets/cart-widget/state';

const MenuHome = () => {
  const { onOpen } = useCartOpen();

  return (
    <div className={`absolute left-0 top-[7%] z-[100] w-screen`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div>
          <LogoIcon width={234} height={19} />
        </div>
        <div className='my-[20px] flex h-[72px] flex-col justify-center border-y border-lightGrey3 pl-[10px]'>
          <div className='flex items-center gap-2'>
            <div>
              <div className='flex'>
                <Marker width={24} height={24} />
                <div>
                  <Typography variant={'p'} className='ml-[10px] text-main'>
                    Сургут
                  </Typography>
                  <div className='ml-[10px] text-sm text-lightGrey3'>Изменить</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ol className='mt-[10px] flex h-[324px] flex-col justify-between pl-[43px]'>
            <li className='mb-3 cursor-pointer font-semibold'>Главная</li>
            <li className='mb-3 cursor-pointer font-semibold'>Войти(Профиль)</li>
            <li className='mb-3 cursor-pointer font-semibold' onClick={onOpen}>
              Корзина
            </li>
            <li className='mb-3 cursor-pointer font-semibold'>Акции</li>
            <li className='mb-3 cursor-pointer font-semibold'>О нас</li>
            <li className='mb-3 cursor-pointer font-semibold'>Доставка</li>
            <li className='mb-3 cursor-pointer font-semibold'>Контакты</li>
            <li className='mb-3 cursor-pointer font-semibold'>Франчайзинг</li>
            <li className='mb-3 cursor-pointer font-semibold'>
              <Link href={ROUTES.restaurants}>Рестораны</Link>
            </li>
          </ol>
        </div>
        <footer className='flex flex-col items-center justify-around'>
          <div className='text-xl font-semibold'>+7 (999) 999 99 99</div>
          <div className='mt-4 flex gap-2'>
            <div>
              <Google width={123} height={35} />
            </div>
            <div>
              <Apple width={123} height={35} />
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default MenuHome;
