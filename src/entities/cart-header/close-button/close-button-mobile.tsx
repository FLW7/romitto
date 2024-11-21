import { X } from 'lucide-react';

import { useCartOpen } from '@/widgets/cart-widget/state';

const CloseButtonMobile = () => {
  const { onClose } = useCartOpen();

  return (
    <X
      size={24}
      className='cursor-pointer max-sm:hidden'
      onClick={() => {
        onClose();
      }}
    />
  );
};

export default CloseButtonMobile;
