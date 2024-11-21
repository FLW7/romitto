import dynamic from 'next/dynamic';

export const GetGiftPromoDynamic = dynamic<unknown>(
  async () => await import('./get-gift-promo').then((mod) => mod.default),
  {
    ssr: false,
  },
);
