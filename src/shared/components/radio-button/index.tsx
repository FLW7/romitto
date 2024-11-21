import { Circle } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

const RadioItem: React.FC<{ checked: boolean; className?: string }> = ({
  checked,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex aspect-square  h-[22px] w-[22px] items-center justify-center rounded-[100px] border text-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'border-main' : 'border-secondary',
        className,
      )}
    >
      <Circle
        className={`h-[14px] w-[14px] ${checked ? 'fill-main' : 'fill-secondary'} ${checked ? 'text-main' : 'text-secondary'}`}
      />
    </div>
  );
};

export default RadioItem;
