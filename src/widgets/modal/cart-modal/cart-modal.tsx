'use client';

import { X } from 'lucide-react';

import styles from './styles.module.css';

import { Sheet, SheetClose, SheetContent } from '@/shared/components/sheet';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { Cart } from '@/widgets/cart-widget';
import { useCartOpen } from '@/widgets/cart-widget/state';

const CartModal = () => {
  const { isOpen, onClose, onOpen } = useCartOpen();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const closeSheet = () => {
    onClose();
  };

  const toggleSheet = (val: boolean) => {
    val ? onOpen() : onClose();
  };

  return (
    isDesktop && (
      <Sheet open={isOpen} modal={false} onOpenChange={toggleSheet}>
        <SheetContent className={`block p-0 ${styles.sheetContent}`} hideCloseButton>
          <SheetClose onClick={closeSheet} asChild className={styles.sheetClose}>
            <X color='white' size={30} />
          </SheetClose>
          <Cart />
        </SheetContent>
      </Sheet>
    )
  );
};

export default CartModal;
