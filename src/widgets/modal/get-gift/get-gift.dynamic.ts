import dynamic from 'next/dynamic';

export const GetGiftDynamic = dynamic<unknown>(
  async () => await import('./get-gift').then((mod) => mod.default),
  {
    ssr: false,
  },
);
