import dynamic from 'next/dynamic';

export const OrderSuccessDynamic = dynamic<unknown>(
  async () => await import('./order-success').then((mod) => mod.default),
  {
    ssr: false,
  },
);
