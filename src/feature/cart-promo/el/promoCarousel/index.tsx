import { type Dispatch, type SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import PromoBg from './promo-bg';

import { type IPromocode } from '@/shared/api/get-min-delivery-price';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/carousel';
import RadioItem from '@/shared/components/radio-button';
import Typography from '@/shared/components/typography';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';
import { checkPromocode } from '@/widgets/cart-widget/api/cart-api';
import { useCart } from '@/widgets/cart-widget/state';
const PromoCarousel: React.FC<{
  promocodes?: IPromocode[];
  promocode?: string;
  setError: Dispatch<SetStateAction<string | number>>;
}> = ({ promocodes, promocode, setError }) => {
  const { mutateAsync } = useMutation({ mutationFn: checkPromocode });
  const { address } = useAddress();
  const { onOpen } = useModal();
  const { isAuth } = useAuth();

  enum responseStatus {
    'NOT-FOUND' = 'Промокод не найден. Попробуйте другой',
    'ERROR' = 'Произошла непредвиденная ошибка, попробуйте позже',
  }
  const { orderSum, applyPromocode, removePromocode } = useCart();

  const submitHandler = async (promocodeValue: string) => {
    if (isAuth) {
      setError('');
      try {
        await mutateAsync({
          promocode: promocodeValue ?? '',
          deliveryType: String(address.LastAddressType ?? 2),
          OrganisationID: String(address.LastAddressOrgID ?? 0),
        }).then((data) => {
          if (data.error) {
            setError(data.message);
            removePromocode();
          } else {
            removePromocode();
            if (orderSum >= data?.MinCartPrice) {
              applyPromocode({ ...data, promocode: promocodeValue });
            } else {
              removePromocode();
              setError(`Cумма заказа должна быть не менее ${data?.MinCartPrice} ₽`);
            }
          }
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          removePromocode();
          error.response.status !== 200 && setError(responseStatus.ERROR);
        }
      }
    } else {
      onOpen('login');
    }
  };

  return (
    <Carousel>
      <CarouselContent className='pl-[22px] lg:pl-11'>
        {promocodes?.map((item, key) => (
          <CarouselItem
            key={key}
            className='cursor-pointer select-none py-5 drop-shadow-promoCardShadow last:!mr-11'
            onClick={async () => {
              await submitHandler(item?.promocode);
            }}
          >
            <div className='relative'>
              <PromoBg checked={promocode === item?.promocode} />
              <div className='absolute left-0 top-0 flex h-full w-full gap-2 px-4 py-3'>
                <RadioItem checked={promocode === item?.promocode} />
                <div className='flex max-w-[calc(100%-30px)] flex-col justify-between'>
                  <Typography
                    variant='desc'
                    className='line-clamp-2 overflow-hidden text-ellipsis !text-sm font-semibold'
                  >
                    {item?.description}
                  </Typography>
                  <span className='mt-[6px] line-clamp-1 block w-fit max-w-full overflow-hidden text-ellipsis rounded-lg bg-[#F3F4F8] px-2 py-1 !text-sm font-semibold text-secondary'>
                    {item.promocode}
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PromoCarousel;
