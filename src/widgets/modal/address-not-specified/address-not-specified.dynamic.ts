import dynamic from 'next/dynamic';

export const AddressNotSpecifiedDynamic = dynamic<unknown>(
  async () => await import('./address-not-specified').then((module_) => module_.default),
  {
    ssr: false,
  },
);
