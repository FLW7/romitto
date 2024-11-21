import { Plus } from 'lucide-react';

import { Button } from './button';

import CartPlusIcon from '@/assets/icons/cart-plus-icon.svg';
import CheckIcon from '@/assets/icons/check.svg';

interface IPlugButtonProps {
  plusIcon?: boolean;
  checked?: boolean;
  onClick?: () => void;
  className?: string;
}

const PlusButton: React.FC<IPlugButtonProps> = ({
  plusIcon = false,
  checked,
  onClick,
  className,
}) => {
  return (
    <Button
      variant={'ghost'}
      className={`h-[36px] w-[36px] rounded-full p-0 ${checked ? 'bg-gradient-to-l from-main to-gradient' : 'bg-main/10'} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {checked ? (
        <CheckIcon width={12} height={12} />
      ) : // eslint-disable-next-line unicorn/no-nested-ternary
      plusIcon ? (
        <Plus size={13} className={'text-main'} />
      ) : (
        <CartPlusIcon width={36} height={36} />
      )}
    </Button>
  );
};

export default PlusButton;
