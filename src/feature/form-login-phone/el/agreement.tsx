import Link from 'next/link';

import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';

export const Agreement = () => {
  return (
    <Typography variant={'desc'} className={cn('mt-4 text-center')}>
      Продолжив, вы соглашаетесь{' '}
      <Link
        href={
          'https://docs.google.com/document/d/1Ph3zDtfavmiNL_DgAc6QYL4kBdeyFS8Zouwj7PS7N5c/edit#heading=h.fn5h0iwci94k'
        }
        target={'_blank'}
        className={'text-main'}
      >
        с обработкой персональных данных и Пользовательским соглашением
      </Link>
    </Typography>
  );
};
