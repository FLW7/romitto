import dynamic from 'next/dynamic';

export const CallbackDynamic = dynamic<unknown>(
  async () => await import('./callback').then((module_) => module_.default),
  {
    ssr: false,
  },
);
