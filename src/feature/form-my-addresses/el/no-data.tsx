import { MAConfig } from '@/feature/form-my-addresses/config';
import Typography from '@/shared/components/typography';

export function NoData() {
  return (
    <div className={'mt-4 flex h-full flex-col items-center justify-center'}>
      <Typography variant={'h5'} className={'mb-2 text-center'}>
        {MAConfig.noData}
      </Typography>
      <Typography variant={'desc'} className={'mb-5 text-center'}>
        {MAConfig.noDataDesc}
      </Typography>
    </div>
  );
}
