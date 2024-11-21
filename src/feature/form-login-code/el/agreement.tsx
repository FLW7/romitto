import Link from 'next/link';

import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';

export const Agreement = () => {
  return (
    <Typography variant={'desc'} className={cn('mt-4 text-center')}>
      Продолжив, вы соглашаетесь{' '}
      <Link href={'/'} className={'text-main'}>
        с обработкой персональных данных и Пользовательским соглашением
      </Link>
    </Typography>
  );
};
