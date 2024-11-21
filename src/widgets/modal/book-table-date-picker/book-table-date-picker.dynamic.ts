import dynamic from 'next/dynamic';

export const BookTableDatePickerDynamic = dynamic<unknown>(
  async () => await import('./book-table-date-picker').then((module_) => module_.default),
  {
    ssr: false,
  },
);
