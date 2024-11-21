import { MAConfig } from '@/feature/form-my-addresses/config';
import { Button } from '@/shared/components/button';
export function LkDeleteAddress() {
  return (
    <div className={'ml-auto'}>
      <Button variant={'destructive'} className={'p-0'}>
        {MAConfig.btnDelete}
      </Button>
    </div>
  );
}
