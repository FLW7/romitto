import dynamic from 'next/dynamic';

import { type ChooseGiftProps } from '@/widgets/modal/choose-gift/choose-gift';

export const ChooseGiftDynamic = dynamic<ChooseGiftProps>(
  async () => await import('./choose-gift').then((module_) => module_.default),
  {
    ssr: false,
  },
);
