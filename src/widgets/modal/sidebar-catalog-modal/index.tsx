'use client';
import SidebarCatalog from '@/feature/sidebar-catalog';
import { Sheet, SheetContent } from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const SidebarCatalogModal = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'catalog';

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
      <SheetContent
        side={isMobile ? 'left' : 'right'}
        hideCloseButton
        className={
          'scrollbar-thin flex h-[100vh] w-10/12 flex-auto flex-col overflow-auto !p-0'
        }
      >
        <SidebarCatalog />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarCatalogModal;
