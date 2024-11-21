import dynamic from 'next/dynamic';

export const StoriesDynamic = dynamic<unknown>(
  async () => await import('./stories').then((module_) => module_.default),
  {
    ssr: false,
  },
);
