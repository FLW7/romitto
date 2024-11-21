import dynamic from 'next/dynamic';

export const BookTableDynamic = dynamic<unknown>(
  async () => await import('./book-table').then((module_) => module_.default),
  {
    ssr: false,
  },
);
