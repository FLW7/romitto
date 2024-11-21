import * as React from 'react';

import { type ICartOrderItem } from '../cart-widget/config';

import { FormModalChooseMyAddress } from '@/feature/form-modal-choose-my-address';
import { FormModalChoosePickup } from '@/feature/form-modal-choose-pickup';
import { MapTabs } from '@/shared/components/map-tabs';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useDelivery } from '@/shared/state/delivery';
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
  const { step } = useDelivery();
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <div className={'flex h-full flex-col'}>
      {!isMobile && <MapTabs />}
      <div className='rounded-t-3xl md:mt-5'>
        {step === 'delivery' && <FormModalChooseMyAddress addPlateItem={addPlate} />}
        {step === 'pickup' && <FormModalChoosePickup addPlateItem={addPlate} />}
      </div>
    </div>
  );
};
