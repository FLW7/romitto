import type { ICartOrderItem, TCartRecCard } from '../../config';
import { useCart } from '../../state';

import styles from './style.module.css';

import CartRecCard from '@/feature/cart-rec-card/cart-rec-card';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/carousel';
import Typography from '@/shared/components/typography';
import { useModal } from '@/shared/state/modal';

interface ICartRecommendationsPops {
  items: TCartRecCard[];
  title?: string;
  classNameTitle?: string;
  classNameItem?: string;
  className?: string;
}

const CartRecommendations: React.FC<ICartRecommendationsPops> = ({
  items,
  title,
  classNameTitle,
  className,
  classNameItem,
}) => {
  const { onOpen } = useModal();
  const { orders } = useCart();

  const openModal = (item: ICartOrderItem) => {
    onOpen('detailMeal', item);
  };

  return (
    <div className={className}>
      {title && (
        <Typography
          variant='desc'
          className={`text-xl max-md:text-base ${styles.carouselTitle} ${classNameTitle}`}
        >
          {title}
        </Typography>
      )}
      <div className='flex max-w-full flex-col'>
        <Carousel
          className='w-full grow'
          opts={{
            align: 'start',
            dragFree: true,
          }}
        >
          <CarouselContent className='ml-1 mr-5 min-h-[145px]'>
            {items?.map((item, index) => (
              <CarouselItem
                key={index}
                className={`${classNameItem} ml-5 pl-0 max-md:ml-3`}
              >
                <CartRecCard
                  item={item}
                  checked={orders?.some((order) => {
                    if (!order || !item) {
                      return false;
                    }

                    return order.id === item.id;
                  })}
                  openModal={openModal}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CartRecommendations;
