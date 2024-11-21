// Home.tsx
'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { checkGiftEligibility } from '@/feature/cart-sum/lib/check-gift-eligibility';
import { useAddress } from '@/shared/state/address';
import { useModal } from '@/shared/state/modal';
import { Cart } from '@/widgets/cart-widget';
import { useCart } from '@/widgets/cart-widget/state';

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { orderSum, giftAvailableChecks, gifts, availableGifts } = useCart();
  const { onOpen, type } = useModal();
  const router = useRouter();

  const isPlacingOrderOpen = type === 'placingOrder';
  const [prevOrderSum, setPrevOrderSum] = useState<number | undefined>(0);
  const [prevAddressType, setPrevAddressType] = useState<number | null>(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1025);
    if (window.innerWidth >= 1025) {
      router.push('/');
    }
  }, [isMobile]);

  const { address } = useAddress();

  useEffect(() => {
    if (
      prevOrderSum !== undefined &&
      orderSum > prevOrderSum &&
      address.LastAddressType === 1
    ) {
      // eslint-disable-next-line unicorn/no-array-for-each
      giftAvailableChecks.forEach((item: number) => {
        if (orderSum > item) {
          onOpen('giftAvaliable');

          giftAvailableChecks.splice(giftAvailableChecks.indexOf(item), 1);
        }
      });
    }

    if (
      prevAddressType === 2 &&
      address.LastAddressType === 1 &&
      !isPlacingOrderOpen &&
      checkGiftEligibility(availableGifts, gifts, orderSum)
    ) {
      onOpen('giftAvaliable');
    }

    setPrevOrderSum(orderSum);
    setPrevAddressType(address.LastAddressType);
  }, [orderSum, address.LastAddressType]);

  return isMobile ? (
    <div className='min-h-[calc(100vh-178px)]'>
      <Cart />
    </div>
  ) : null;
};

export default Home;
