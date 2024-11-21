import styles from './style.module.css';

import EmptyIcon from '@/assets/icons/empty-cart.svg';
import Typography from '@/shared/components/typography';

const CartEmptyPlug: React.FC = () => {
  return (
    <div className={styles.emptyPlug}>
      <div className='flex flex-col items-center text-center'>
        <EmptyIcon className='mb-6 h-[88px] w-[147px] max-md:h-[140px] max-md:w-[162px]' />
        <Typography
          variant='h2'
          className='mb-5 text-2xl font-semibold max-md:mb-3 max-md:text-xl'
        >
          Корзина пустая
        </Typography>
        <Typography variant='p' className='text-base font-medium text-secondary'>
          Спешите пополнить ее любимыми
          <br /> блюдами!
        </Typography>
      </div>
    </div>
  );
};

export default CartEmptyPlug;
