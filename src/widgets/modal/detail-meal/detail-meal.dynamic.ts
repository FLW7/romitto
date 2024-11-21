import dynamic from 'next/dynamic';

export const DetailMealDynamic = dynamic<unknown>(
  async () => await import('./detail-meal-modal').then((module_) => module_.default),
  {
    ssr: false,
  },
);
