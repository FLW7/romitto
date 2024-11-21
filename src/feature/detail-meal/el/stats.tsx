import Typography from '@/shared/components/typography';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

const Stats: React.FC<{ plateItem: ICartOrderItem }> = ({ plateItem }) => {
  return (
    <div
      className={
        'flex h-[80px] items-center gap-1 rounded-xl bg-white px-4 max-sm:py-[18px]'
      }
    >
      <div
        className={
          'flex h-[53px] w-full flex-col items-center gap-1 rounded-lg bg-[#F3F4F8] py-[6px]'
        }
      >
        <Typography variant={'p'} className={`!text-sm font-semibold`}>
          {plateItem?.calories}
        </Typography>
        <Typography variant={'p'} className={`!text-xs !font-normal text-primary/50`}>
          ККал
        </Typography>
      </div>
      <div
        className={
          'flex h-[53px] w-full flex-col items-center gap-1 rounded-lg bg-[#F3F4F8] py-[6px]'
        }
      >
        <Typography variant={'p'} className={`!text-sm font-semibold`}>
          {plateItem?.proteins}
        </Typography>
        <Typography variant={'p'} className='!text-xs !font-normal text-primary/50'>
          Белки
        </Typography>
      </div>
      <div
        className={
          'flex h-[53px] w-full flex-col items-center gap-1 rounded-lg bg-[#F3F4F8] py-[6px]'
        }
      >
        <Typography variant={'p'} className={`!text-sm font-semibold`}>
          {plateItem?.carbohydrates}
        </Typography>
        <Typography variant={'p'} className='!text-xs !font-normal text-primary/50'>
          Углеводы
        </Typography>
      </div>
      <div
        className={
          'flex h-[53px] w-full flex-col items-center gap-[2px] rounded-lg bg-[#F3F4F8] py-[6px]'
        }
      >
        <Typography variant={'p'} className={`!text-sm font-semibold`}>
          {plateItem?.fats}
        </Typography>
        <Typography variant={'p'} className='!text-xs !font-normal text-primary/50'>
          Жиры
        </Typography>
      </div>
    </div>
  );
};

export default Stats;
