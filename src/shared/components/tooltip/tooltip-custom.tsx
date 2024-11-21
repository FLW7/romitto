import { Tooltip, type ITooltip } from 'react-tooltip';

import styles from './style.module.css';

import { cn } from '@/shared/lib/utils';

const TooltipCustom: React.FC<ITooltip> = ({ className, ...props }) => {
  return (
    <div className={styles.tooltipContainer}>
      <Tooltip {...props} className={cn(styles.tooltip, className)} delayShow={200} />
    </div>
  );
};

export default TooltipCustom;
