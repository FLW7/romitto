import Typography from '@/shared/components/typography';
import type { ICartOrderItem } from '@/widgets/cart-widget/config';

export const Macronutrients = ({ allergenes }: ICartOrderItem) => {
  return (
    allergenes?.length > 0 && (
      <div className='rounded-xl bg-white px-4 py-[18px]'>
        <Typography variant={'p'} className={`text-sm text-secondary`}>
          Аллергены
        </Typography>

        <Typography variant='desc'>{allergenes?.join(', ')}</Typography>
      </div>
    )
  );
};
