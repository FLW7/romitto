'use client';

import { motion } from 'framer-motion';

import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';

export interface Tab {
  title: string;
  value: string;
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  active,
  setActive,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  active: Tab;
  setActive: (value: Tab) => void;
}) => {
  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);

    newTabs.unshift(selectedTab[0]);
    setActive(newTabs[0]);
  };

  return (
    <div
      className={cn(
        'no-visible-scrollbar relative flex h-[34px] max-h-[34px] min-h-[34px] flex-row items-center justify-start overflow-auto overflow-y-hidden rounded-full bg-cartBg p-[2px] [perspective:1000px] sm:overflow-visible',
        containerClassName,
      )}
    >
      {propTabs.map((tab, idx) => (
        <button
          key={tab.title}
          onClick={() => {
            moveSelectedTabToTop(idx);
          }}
          className={cn(
            'relative h-full w-full grow rounded-full outline-none',
            tabClassName,
          )}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {active.value === tab.value && (
            <motion.div
              layoutId='clickedbutton'
              transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
              className={cn(
                'absolute inset-0 rounded-full bg-white shadow-sizeTabShadow dark:bg-black',
                activeTabClassName,
              )}
            />
          )}

          <Typography
            variant={'p'}
            className={cn(
              'relative !text-xs !font-semibold transition-all',
              active.value === tab.value
                ? '!text-primary dark:!text-white'
                : '!text-secondary',
            )}
          >
            {tab.title}
          </Typography>
        </button>
      ))}
    </div>
  );
};
