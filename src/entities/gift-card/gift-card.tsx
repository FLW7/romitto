'use client';

import styles from './style.module.css';

import WhiteGiftIcon from '@/assets/icons/white-gift.svg';
import WhiteGiftsBg from '@/assets/icons/white-gifts-bg.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import { useModal } from '@/shared/state/modal';

interface IGiftCardProps {
  disabled?: boolean;
  price: number;
}

const GiftCard: React.FC<IGiftCardProps> = ({ disabled, price }) => {
  const { onOpen } = useModal();

  const clickHandler = () => {
    onOpen('chooseGift');
  };

  return (
    <div className={`${styles.giftCard} ${disabled ? 'bg-[#D7D7D7]' : 'bg-main'}`}>
      <div className={styles.giftCard__icon}>
        <WhiteGiftsBg width={142} height={100} className='absolute left-0 top-0' />
        <WhiteGiftIcon width={44} height={45} />
      </div>
      <Typography variant='p' className={styles.giftCard__text}>
        Подарок за заказ от {priceFormatter(price)}
      </Typography>
      <Button
        onClick={clickHandler}
        variant={'secondary'}
        className={`rounded-full border-none bg-white hover:bg-white ${disabled ? 'pointer-events-none text-[#D7D7D7]' : 'text-main'}`}
      >
        Выбрать
      </Button>
    </div>
  );
};

export default GiftCard;
