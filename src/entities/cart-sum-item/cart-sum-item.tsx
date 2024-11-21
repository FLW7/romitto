import styles from './styles.module.css';

import Typography from '@/shared/components/typography';

interface ISumItemProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export const SumItem: React.FC<ISumItemProps> = ({ title, value, icon }) => {
  return (
    <div className='flex items-center justify-between'>
      <Typography variant='desc' className='!text-sm font-normal !leading-[24px]'>
        {title}
      </Typography>
      <Typography variant='desc' className={styles.sumItem__value}>
        {value} {icon && icon}
      </Typography>
    </div>
  );
};
