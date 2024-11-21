import Link from 'next/link';

import MirIcon from '@/assets/icons/mir-pay.svg';
import SberIcon from '@/assets/icons/sberbank.svg';
import SBPIcon from '@/assets/icons/sbp.svg';
import YPayIcon from '@/assets/icons/ypay.svg';
import TBankIcon from '@/assets/icons-yap/t-bank.svg';

export const Banks = () => {
  return (
    <div
      className={
        'container-xl mx-auto flex w-full justify-end border-t border-black/10 py-[15px] max-lg:flex max-lg:justify-center max-md:py-5'
      }
    >
      <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-3 max-lg:max-w-[343px]'>
        <Link href='https://www.tbank.ru/'>
          <TBankIcon className='h-[24px] w-[80px]' />
        </Link>
        <Link href='https://www.sberbank.com/promo/sberpay/'>
          <SberIcon className='h-[38px] w-[64px]' />
        </Link>
        <Link href='https://sbp.nspk.ru/sbpay/'>
          <SBPIcon className='h-[32px] w-[64px]' />
        </Link>
        <Link href='https://mirpayonline.ru/'>
          <MirIcon className='h-[31px] w-[65px]' />
        </Link>
        <Link href='https://bank.yandex.ru/pay/'>
          <YPayIcon className='h-[36px] w-[50px]' />
        </Link>
      </div>
    </div>
  );
};
