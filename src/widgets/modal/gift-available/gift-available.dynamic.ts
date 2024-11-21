import dynamic from 'next/dynamic';

export const GiftAvaliableDynamic = dynamic<unknown>(
  async () => await import('./gift-available').then((mod) => mod.default),
  {
    ssr: false,
  },
);
