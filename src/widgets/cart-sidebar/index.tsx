import { Cart } from '../cart-widget';

import { Sidebar, SidebarContent } from '@/shared/components/sidebar';

const CartSidebar = () => {
  return (
    <Sidebar side='right' className='border-none bg-cartBg outline-none'>
      <SidebarContent>
        <Cart />
      </SidebarContent>
    </Sidebar>
  );
};

export default CartSidebar;
