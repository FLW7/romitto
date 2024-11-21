import dynamic from 'next/dynamic';

export const AdAppModalDynamic = dynamic<unknown>(
  async () => await import('./ad-app-modal').then((module_) => module_.default),
  {
    ssr: false,
  },
);
