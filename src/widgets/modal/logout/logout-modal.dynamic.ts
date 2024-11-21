import dynamic from 'next/dynamic';

export const LogoutModalDynamic = dynamic<unknown>(
  async () => await import('./logout-modal').then((module_) => module_.LogoutModal),
  {
    ssr: false,
  },
);
