import HoverButton from './hover-button';

import { useCartOpen } from '@/widgets/cart-widget/state';

const CartButtonMobile = () => {
  const { onOpen } = useCartOpen();

  return <HoverButton onClick={onOpen} />;
};

export default CartButtonMobile;
