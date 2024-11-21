import HoverButton from './hover-button';

import { useSidebar } from '@/shared/components/sidebar';

const CartButtonDesktop = () => {
  const { toggleSidebar, open } = useSidebar();

  return <HoverButton onClick={toggleSidebar} sidebarOpen={open} />;
};

export default CartButtonDesktop;
