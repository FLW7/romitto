import styles from './styles.module.css';

import { LkCardWrapper } from '@/entities/card-personal-information';
import { FormMyAddresses } from '@/feature/form-my-addresses';
import { FormPersonalInformation } from '@/feature/form-personal-information';

export function PersonalInformation() {
  return (
    <div className={styles.container}>
      <LkCardWrapper
        className={'p-4 shadow-mobCardLk md:min-h-[420px] lg:bg-bgSecondary'}
      >
        <FormPersonalInformation />
      </LkCardWrapper>

      <LkCardWrapper className='lg:bg-bgSecondary'>
        <FormMyAddresses />
      </LkCardWrapper>
    </div>
  );
}
