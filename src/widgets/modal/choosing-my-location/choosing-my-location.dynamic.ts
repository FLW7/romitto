import dynamic from 'next/dynamic';

export const ChoosingMyLocationDynamic = dynamic<unknown>(
  async () => await import('./choosing-my-location').then((module_) => module_.default),
  {
    ssr: false,
  },
);
