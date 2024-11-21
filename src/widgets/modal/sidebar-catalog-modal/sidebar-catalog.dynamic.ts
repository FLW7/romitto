import dynamic from 'next/dynamic';

export const SidebarCatalogDynamic = dynamic<unknown>(
  async () => await import('.').then((module_) => module_.default),
  {
    ssr: false,
  },
);
