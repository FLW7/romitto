/* eslint-disable unicorn/no-nested-ternary */
'use client';

import { motion } from 'framer-motion';

import DeliveryIcon from './icons/delivery-icon';
import PickupIcon from './icons/pickup-icon';

import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
import { type StepFormType, useDelivery } from '@/shared/state/delivery';

export const MapTabs = () => {
  const { setStep, step } = useDelivery();

  const TABS = [
    {
      title: 'Доставка',
      value: 'delivery',
      icon: (
        <DeliveryIcon
          className={cn(
            'h-4 w-4 transition-all',
            step === 'delivery' || step === 'addAddress'
              ? 'fill-white'
              : 'fill-primary/50',
          )}
        />
      ),
    },
    {
      title: 'Самовывоз',
      value: 'pickup',
      icon: (
        <PickupIcon
          className={cn(
            'h-4 w-4 transition-all',
            step === 'pickup' ? 'fill-white' : 'fill-primary/50',
          )}
        />
      ),
    },
  ];

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...TABS];
    const selectedTab = newTabs.splice(idx, 1);

    newTabs.unshift(selectedTab[0]);
    setStep(newTabs[0].value as StepFormType);
  };

  return (
    <div
      className={cn(
        'no-visible-scrollbar relative flex min-h-[44px] p-[2px]',
        'flex-row items-center justify-start overflow-auto overflow-y-hidden',
        'rounded-full bg-bgTetriary shadow-mapTabsShadow [perspective:1000px] sm:overflow-visible',
      )}
    >
      {TABS.map((tab, idx) => (
        <button
          key={tab.title}
          onClick={() => {
            moveSelectedTabToTop(idx);
          }}
          className={cn(
            'relative flex min-h-[44px] w-full grow items-center justify-center rounded-full outline-none',
          )}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {(tab.value === 'delivery'
            ? step === tab.value || step === 'addAddress'
            : step === tab.value) && (
            <motion.div
              layoutId='clickedbutton'
              transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
              className={cn(
                'absolute inset-0 min-h-full rounded-full bg-gradient-to-l from-main to-gradient',
              )}
            />
          )}

          <Typography
            variant={'p'}
            className={cn(
              'relative flex items-center gap-1 !text-sm !font-semibold transition-all',
              (
                tab.value === 'delivery'
                  ? step === tab.value || step === 'addAddress'
                  : step === tab.value
              )
                ? '!text-white'
                : '!text-primary/50',
            )}
          >
            {tab.title}
            {tab.icon}
          </Typography>
        </button>
      ))}
    </div>
  );
};
