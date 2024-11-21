import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import CloseButton from './close-button/close-button';
import CloseButtonMobile from './close-button/close-button-mobile';

import Trash from '@/assets/icons/trash.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useCart } from '@/widgets/cart-widget/state';

const CartHeader = () => {
  const { clearCart } = useCart();
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width:1460px)');

  return (
    <div className='mb-3 flex items-center justify-between'>
      <div className='flex items-center gap-[10px]'>
        {/* <X size={24} strokeWidth={1.5} className='max-sm:hidden' /> */}
        <ChevronLeft
          size={24}
          strokeWidth={1.5}
          className='stroke-primary sm:hidden'
          onClick={() => {
            router.back();
          }}
        />
        {isDesktop ? <CloseButton /> : <CloseButtonMobile />}
        <Typography variant='desc' className='text-[24px] font-semibold'>
          Корзина
        </Typography>
      </div>
      <Button variant={'destructive'} className='p-0' onClick={clearCart}>
        <Typography
          variant='desc'
          className='flex cursor-pointer items-center text-xs font-normal text-secondary max-lg:hidden'
        >
          очистить корзину
        </Typography>
        <Trash className='h-6 w-6 lg:ml-1' />
      </Button>
    </div>
  );
};

export default CartHeader;
