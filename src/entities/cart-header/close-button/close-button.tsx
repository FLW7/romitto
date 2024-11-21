import { X } from 'lucide-react';

import { useSidebar } from '@/shared/components/sidebar';

const CloseButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <X
      size={24}
      className='cursor-pointer max-sm:hidden'
      onClick={() => {
        toggleSidebar();
      }}
    />
  );
};

export default CloseButton;
