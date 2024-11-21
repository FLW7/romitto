import styles from '../styles.module.css';

import AddIcon from '@/assets/icons/add.svg';
import LocationIcon from '@/assets/icons/location.svg';
import Typography from '@/shared/components/typography';
import { useDelivery } from '@/shared/state/delivery';
import { useModal } from '@/shared/state/modal';
export function MobAddAddress() {
  const { setStep } = useDelivery();
  const { onOpen } = useModal();

  return (
    <button
      className={styles.mob_container}
      onClick={() => {
        setStep('addAddress');
        onOpen('choosingMyLocation');
      }}
    >
      <div className={'flex items-center gap-2'}>
        <LocationIcon width={22} height={22} />
        <Typography variant={'p2'} className={'font-[600] text-main'}>
          Добавить адрес
        </Typography>
      </div>

      <div>
        <AddIcon />
      </div>
    </button>
  );
}
