import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { LkConfig } from '@/widgets/lk/config';

export function Empty() {
  return (
    <div className={'flex flex-col items-center'}>
      <Typography variant={'h5'} className={'mb-2'}>
        {LkConfig.order.empty}
      </Typography>
      <Typography variant={'desc'} className={'mb-5'}>
        {LkConfig.order.emptyDesc}
      </Typography>
      <Button variant={'outline'} className={'px-20'}>
        {LkConfig.order.emptyBtn}
      </Button>
    </div>
  );
}
