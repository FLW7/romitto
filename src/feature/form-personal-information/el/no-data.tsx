import { PIConfig } from '@/feature/form-personal-information/config';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';

export function NoData() {
  return (
    <div>
      <Typography variant={'h6'} className={'mb-20'}>
        {PIConfig.title}
      </Typography>

      <div className={'flex flex-col items-center'}>
        <Typography variant={'h5'} className={'mb-2'}>
          {PIConfig.noData}
        </Typography>
        <Typography variant={'desc'} className={'mb-5'}>
          {PIConfig.noDataDesc}
        </Typography>
        <Button variant={'outline'} className={'px-20'}>
          Войти
        </Button>
      </div>
    </div>
  );
}
