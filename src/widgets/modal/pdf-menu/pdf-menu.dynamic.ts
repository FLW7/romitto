import dynamic from 'next/dynamic';

export const PDFMenuDynamic = dynamic<unknown>(
  async () => await import('./index').then((mod) => mod.default),
  {
    ssr: false,
  },
);
