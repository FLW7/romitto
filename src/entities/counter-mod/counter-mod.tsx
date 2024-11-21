import { Minus, Plus } from 'lucide-react';

import styles from './styles.module.css';

import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';

interface CounterProperties {
  callBack: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  value: number;
  style?: any;
  className?: string;
  classNameText?: string;
}

const CounterMod: React.FC<CounterProperties> = ({
  style,
  minValue = 0,
  maxValue,
  value = 0,
  callBack,
  className,
  classNameText,
}) => {
  const changeHandler = (value: number) => {
    callBack && callBack(value);
  };

  return (
    <div className={`${className} ${styles.counter}`} style={style}>
      <Button
        onClick={() => {
          changeHandler(value - 1);
        }}
        variant={'ghost'}
        className={cn(styles.btn)}
        disabled={value <= minValue}
      >
        <Minus size='14' className={'text-white'} />
      </Button>
      <Typography
        variant='p'
        className={cn(
          'mb-0 w-fit min-w-5 text-center !text-sm !font-semibold',
          classNameText,
        )}
      >
        {value}
      </Typography>
      <Button
        onClick={() => {
          changeHandler(value + 1);
        }}
        variant={'ghost'}
        className={cn(styles.btn)}
        disabled={maxValue !== undefined && value >= maxValue}
      >
        <Plus size='14' className={'text-white'} />
      </Button>
    </div>
  );
};

export default CounterMod;
