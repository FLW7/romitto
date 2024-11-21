'use client';

import Link from 'next/link';

import { Button } from '@/shared/components/button';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';
import { useModal } from '@/shared/state/modal';

const PDFMenu = () => {
  const { type, onClose } = useModal();
  const isModalOpen = type === 'PDFmenu';

  const links = [
    {
      title: 'Меню кухня',
      href: 'https://roll66.ru/storage/biznes_lunch/Kuhna_Razvaroty.pdf',
    },
    {
      title: 'Меню бар',
      href: 'https://roll66.ru/storage/biznes_lunch/bar_razvoroty.pdf',
    },
    {
      title: 'Меню детское',
      href: 'https://roll66.ru/storage/biznes_lunch/детское_мама_2024.pdf',
    },
  ];

  return (
    <ResponsiveDialog
      open={isModalOpen}
      onClose={onClose}
      classNameOverlay='z-[100]'
      className='min-w-auto z-[102] md:min-w-[450px]'
    >
      <div className='flex flex-col items-center gap-y-3 p-7'>
        {links.map((link, key) => (
          <Link key={key} href={link.href} target='_blank' className='w-full'>
            <Button className='w-full'>{link.title}</Button>
          </Link>
        ))}
      </div>
    </ResponsiveDialog>
  );
};

export default PDFMenu;
