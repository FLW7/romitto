import ShopIcon from '@/assets/icons/footer-cart.svg';
import CartHeader from '@/entities/cart-header/cart-header';
import { Button } from '@/shared/components/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/hover-card';
import { ScrollArea } from '@/shared/components/scroll-area';
import Typography from '@/shared/components/typography';
import { priceFormatter } from '@/shared/lib/price';
import { useCart } from '@/widgets/cart-widget/state';
import CartOrdersList from '@/widgets/cart-widget/ui/cart-orders-list/cart-orders-list';
const HoverButton: React.FC<{ sidebarOpen?: boolean; onClick: () => void }> = ({
  sidebarOpen,
  onClick,
}) => {
  const { orderSum, ordersCount } = useCart();

  const CartButton = () => {
    return (
      <Button
        onClick={onClick}
        className='flex cursor-pointer select-none items-center gap-x-[10px] rounded-full px-4 py-[10px]'
      >
        <div className='flex items-center gap-1'>
          <ShopIcon className={'h-6 w-6'} />
          <Typography
            variant='desc'
            className='text-base font-semibold leading-[22px] text-white'
          >
            {ordersCount === 0 ? 'Корзина' : 'x' + ordersCount}
          </Typography>
        </div>
        <span className='block h-[26px] w-[1px] bg-white' />
        <Typography
          variant='desc'
          className='whitespace-nowrap text-base font-semibold leading-[22px] text-white'
        >
          {priceFormatter(orderSum)}
        </Typography>
      </Button>
    );
  };

  if (ordersCount === 0 || sidebarOpen) {
    return <CartButton />;
  }

  return (
    <HoverCard openDelay={50}>
      <HoverCardTrigger>
        <CartButton />
      </HoverCardTrigger>
      <HoverCardContent
        side={'bottom'}
        align='end'
        sideOffset={10}
        className='flex h-[418px] w-[419px] flex-col gap-y-4 rounded-xl border-none bg-white px-0 py-[22px]'
      >
        <div className='px-[22px]'>
          <CartHeader />
        </div>
        <ScrollArea className='h-[256px] select-none'>
          <div className='px-[22px]'>
            <CartOrdersList min={true} />
          </div>
        </ScrollArea>
        <div className='w-full px-[22px]'>
          <Button className='w-full' onClick={onClick}>
            Перейти в корзину
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverButton;
