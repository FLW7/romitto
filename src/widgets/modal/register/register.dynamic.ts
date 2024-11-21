import dynamic from 'next/dynamic';

export const RegisterDynamic = dynamic<unknown>(
  async () => await import('./register').then((module_) => module_.default),
  {
    ssr: false,
  },
);
