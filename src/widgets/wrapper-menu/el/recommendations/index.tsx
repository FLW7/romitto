import Typography from '@/shared/components/typography';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import CartRecommendations from '@/widgets/cart-widget/ui/cart-recommendations/cart-recommendations';

const Recommendations: React.FC<{ filtered: ICartOrderItem[] }> = ({ filtered }) => {
  return (
    (filtered?.length ?? 0) > 0 && (
      <div className='mt-[60px] max-lg:mt-7'>
        <Typography
          variant='desc'
          className='px-3 font-semibold text-primary max-md:text-lg md:text-2xl'
        >
          Выгодно
        </Typography>
        {filtered && (
          <CartRecommendations
            className='mt-0'
            items={filtered}
            classNameItem='basis-[20%] max-[1280px]:basis-[25%] max-lg:basis-[30%] max-[830px]:basis-[45%] max-sm:basis-[70%]'
          />
        )}
      </div>
    )
  );
};

export default Recommendations;
