import { CheckIcon } from 'lucide-react';

import { Button } from './button';

interface IPlugButtonProps {
  plusIcon?: boolean;
  checked?: boolean;
  onClick?: () => void;
  className?: string;
}

const PlusButtonMod: React.FC<IPlugButtonProps> = ({
  plusIcon = false,
  checked,
  onClick,
  className,
}) => {
  return (
    <Button
      variant={'ghost'}
      className={`h-5 w-5 rounded-[4px] p-0 transition-none ${checked ? 'bg-gradient-to-l from-main to-gradient' : 'border !border-primary/10 bg-bgTetriary'} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {checked ? <CheckIcon size={14} color='white' strokeWidth={3} /> : null}
    </Button>
  );
};

export default PlusButtonMod;
