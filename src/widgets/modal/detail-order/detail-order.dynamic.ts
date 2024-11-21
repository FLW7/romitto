import dynamic from 'next/dynamic';

export const DetailOrderDynamic = dynamic<unknown>(
  async () => await import('./detail-order-modal').then((module_) => module_.default),
  {
    ssr: false,
  },
);
