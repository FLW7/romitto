import { MAConfig } from '@/feature/form-my-addresses/config';
import { Button } from '@/shared/components/button';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';
export function ButtonAddAddress() {
  const { setStep } = useDelivery();
  const { onOpen } = useModal();

  return (
    <Button
      className={'px-20'}
      variant={'outline'}
      onClick={() => {
        setStep('addAddress');
        onOpen('choosingMyLocation');
      }}
    >
      {MAConfig.btnAddAddress}
    </Button>
  );
}
