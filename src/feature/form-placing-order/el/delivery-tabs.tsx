import * as React from 'react';

import { type Tab, Tabs } from '@/shared/components/tabs-animate';
import { TABS } from '@/widgets/delivery-tabs';

interface Props {
  deliveryClick: () => void;
  pickupClick: () => void;
  step?: string;
}
export const DeliveryTabs = ({ deliveryClick, pickupClick, step }: Props) => {
  const handleChange = (value: Tab) => {
    if (value.value === 'delivery') {
      deliveryClick();
    } else if (value.value === 'pickup') {
      pickupClick();
    }
  };

  return (
    <Tabs
      tabs={TABS}
      active={TABS.find((tab) => tab.value === step) ?? TABS[0]}
      setActive={handleChange}
    />
  );
};
