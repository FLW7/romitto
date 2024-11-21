import { type ReactNode } from 'react';

import styles from './style.module.css';

import { TabsTrigger } from '@/shared/components/tabs';
import { cn } from '@/shared/lib/utils';

const TabTrigger: React.FC<{
  value: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}> = ({ value, className, children, onClick }) => {
  return (
    <TabsTrigger
      onClick={onClick}
      value={value}
      className={cn(styles.tabTrigger, className)}
    >
      {children}
    </TabsTrigger>
  );
};

export default TabTrigger;
