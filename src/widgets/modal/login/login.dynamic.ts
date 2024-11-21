import dynamic from 'next/dynamic';

export const LoginDynamic = dynamic<unknown>(
  async () => await import('./login').then((module_) => module_.default),
  {
    ssr: false,
  },
);
