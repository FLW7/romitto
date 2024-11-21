import dynamic from 'next/dynamic';

export const RateOrderDynamic = dynamic<unknown>(
  async () => await import('./rate-order').then((module_) => module_.default),
  {
    ssr: false,
  },
);
