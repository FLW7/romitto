import CloseIcon from '@/assets/icons/close.svg';
import LogoIcon from '@/assets/icons/logo-dark.svg';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useModal } from '@/shared/state/modal';

const Header = () => {
  const { onClose } = useModal();
  const isMobile = useMediaQuery('(max-width:769px)');

  return (
    <div className={'flex items-center px-4 py-[11px] shadow-sidebarCatalog'}>
      <LogoIcon className={'h-logoSidebar w-logoSidebar'} />
      {isMobile && (
        <button
          className={'absolute right-6 top-6 text-start outline-none'}
          onClick={() => {
            onClose();
          }}
        >
          <CloseIcon className={'h-3.5 w-3.5 stroke-secondary'} />
        </button>
      )}
    </div>
  );
};

export default Header;
