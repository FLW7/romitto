'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CartIcon from '@/assets/icons/footer-cart.svg';
import CourierIcon from '@/assets/icons/footer-delivery.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { ROUTES } from '@/shared/const/routes';
import { priceFormatter } from '@/shared/lib/price';
import { useAddress } from '@/shared/state/address';
import { useCart } from '@/widgets/cart-widget/state';

export const MobFixNavigation = () => {
  const { deliveryPrice, ordersCount, orderSum } = useCart();
  const { address } = useAddress();
  const pathname = usePathname();

  return (
    pathname !== '/cart' && (
      <div
        className={
          'flex w-full flex-col items-center justify-center rounded-t-lg border-t border-black/10  bg-white px-4 lg:hidden'
        }
      >
        {Number(address.LastAddressOrgID) > 0 && (
          <div className='flex items-center'>
            <CourierIcon className='mr-1 h-3 w-3' />
            <Typography
              variant='desc'
              className='py-2 !text-xs !font-semibold leading-[16.8px]'
            >
              Стоимость доставки{' '}
              <span className='ml-2'>{priceFormatter(deliveryPrice)}</span>
            </Typography>
          </div>
        )}
        {ordersCount > 0 && (
          <Link href={ROUTES.cart}>
            <Button className='mb-[11px] flex h-11 w-full gap-3 bg-main2 px-7'>
              <div className='flex items-center gap-[10px]'>
                <div className='flex items-center gap-1'>
                  <CartIcon className='h-6 w-6' />
                  <Typography
                    variant='desc'
                    className='flex items-center !text-base font-semibold text-white'
                  >
                    x{ordersCount}
                  </Typography>
                </div>
                <span className='block h-[20px] w-[1px] bg-white'></span>
                <Typography
                  variant='desc'
                  className='flex items-center !text-base font-semibold text-white'
                >
                  {priceFormatter(orderSum)}
                </Typography>
              </div>
              <Typography
                variant='desc'
                className='flex items-center !text-sm font-semibold text-white'
              >
                Перейти в корзину <ChevronRight size={16} />
              </Typography>
            </Button>
          </Link>
        )}
      </div>
    )
  );
};
