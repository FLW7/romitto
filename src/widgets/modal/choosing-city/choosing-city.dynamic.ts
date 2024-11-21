import dynamic from 'next/dynamic';

export const ChoosingCityDynamic = dynamic<unknown>(
  async () => await import('./choosing-city').then((module_) => module_.ChoosingCity),
  {
    ssr: false,
  },
);
