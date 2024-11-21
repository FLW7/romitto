import dynamic from 'next/dynamic';

export const OrderRejectDynamic = dynamic<unknown>(
  async () => await import('./order-reject').then((mod) => mod.default),
  {
    ssr: false,
  },
);
