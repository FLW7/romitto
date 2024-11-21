import Image from 'next/image';

import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import { type IPlatesItem } from '@/widgets/lk/detail-order/type';
interface CardProps {
  plate: IPlatesItem;
}
export const Card = ({ plate }: CardProps) => {
  return (
    <div className={'flex overflow-hidden shadow-cardLk md:h-[128px] md:rounded-[12px]'}>
      <Image
        src={plate.thumbnailPicture}
        width={120}
        height={120}
        alt='order-image'
        className={'object-cover'}
      />

      <div className={'flex grow flex-col justify-between px-3 py-4'}>
        <Typography variant={'p'} className={'font-semibold'}>
          {plate.name}
          <span className={'ml-2.5 text-secondary'}>x {plate.count}</span>
        </Typography>

        <div className={'flex justify-between'}>
          <Typography variant={'p2'} className={'text-secondary'}>
            {plate.mass}
          </Typography>
          <Typography variant={'h6'} className={' font-semibold'}>
            {priceFormatter(plate.price)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
