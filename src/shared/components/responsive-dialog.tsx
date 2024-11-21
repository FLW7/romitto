import { cn } from '../lib/utils';

import { Dialog, DialogContent } from './dialog';
import { Drawer, DrawerContent } from './drawer';

import useMediaQuery from '@/shared/hooks/use-media-query';

interface IResponsiveDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
  onClose?: () => void;
  classNameOverlay?: string;
  className?: string;
}

export const ResponsiveDialog: React.FC<IResponsiveDialogProps> = ({
  children,
  open,
  onClose,
  onOpenChange,
  classNameOverlay,
  className,
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        {/* //TODO: Check classNameOverlay && 'overlay-class' */}
        <DialogContent
          className={cn('w-fit max-w-[900px] bg-white md:p-0', className)}
          classNameOverlay={classNameOverlay}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent
        className={cn('bg-white max-md:pb-[60px]', className)}
        classNameOverlay={classNameOverlay}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};
