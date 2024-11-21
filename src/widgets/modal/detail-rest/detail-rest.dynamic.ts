import dynamic from 'next/dynamic';

export const DetailRestDynamic = dynamic<unknown>(
  async () => await import('./detail-rest-modal').then((module_) => module_.default),
  {
    ssr: false,
  },
);
