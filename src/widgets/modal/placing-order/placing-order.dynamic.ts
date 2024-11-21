import dynamic from 'next/dynamic';

export const PlacingOrderDynamic = dynamic<unknown>(
  async () => await import('./placing-order').then((mod) => mod.default),
  {
    ssr: false,
  },
);
