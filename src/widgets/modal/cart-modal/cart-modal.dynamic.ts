import dynamic from 'next/dynamic';

export const CartModalDynamic = dynamic<unknown>(
  async () => await import('./cart-modal').then((module_) => module_.default),
  {
    ssr: false,
  },
);
