import dynamic from 'next/dynamic';

export const GiftNotifyDynamic = dynamic<unknown>(
  async () => await import('./gift-notify').then((mod) => mod.default),
  {
    ssr: false,
  },
);
