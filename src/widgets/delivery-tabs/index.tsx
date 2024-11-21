import * as React from 'react';

import { type ICartOrderItem } from '../cart-widget/config';

import { FormModalChooseMyAddress } from '@/feature/form-modal-choose-my-address';
import { FormModalChoosePickup } from '@/feature/form-modal-choose-pickup';
import { type Tab, Tabs } from '@/shared/components/tabs-animate';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { useDelivery } from '@/shared/state/delivery';
import { useMap } from '@/shared/state/map';
export const TABS = [
  {
    title: 'Доставка',
    value: 'delivery',
  },
  {
    title: 'Самовывоз',
    value: 'pickup',
  },
];
export const DeliveryTabs: React.FC<{ addPlate?: ICartOrderItem }> = ({ addPlate }) => {
  const { isAuth } = useAuth();
  const { address } = useAddress();
  const { map } = useMap();
  const { setStep, step } = useDelivery();

  const handleChange = (value: Tab) => {
    if (value.value === 'pickup') {
      setStep('pickup');

      return;
    }

    setStep(isAuth ? 'delivery' : 'addAddress');

    if (map && address?.LastLat && address?.LastLng)
      void map.panTo([address?.LastLat, address?.LastLng]);
  };

  return (
    <div className={'flex h-full flex-col space-y-4'}>
      <Tabs
        tabs={TABS}
        active={TABS.find((tab) => tab.value === step) ?? TABS[0]}
        setActive={handleChange}
      />
      {step === 'delivery' && <FormModalChooseMyAddress addPlateItem={addPlate} />}
      {step === 'pickup' && <FormModalChoosePickup addPlateItem={addPlate} />}
    </div>
  );
};
