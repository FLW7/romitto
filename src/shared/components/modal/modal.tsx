import React, { useEffect, useRef } from 'react';

import { X } from 'lucide-react';
import ReactDOM from 'react-dom';

import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/state/modal';

interface ModalProps {
  isOpen: boolean;
  isHiddenCloseButton?: boolean;
  className?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  isHiddenCloseButton,
}) => {
  const { onClose: onCloseModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollbarWidth = useRef(0);

  useEffect(() => {
    if (isOpen) {
      scrollbarWidth.current = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth.current}px`;
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose && onClose();
      onCloseModal();
    }
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setTimeout(() => {
        document.body.style.paddingRight = '';
        document.body.style.overflow = 'auto';
      }, 0);
    }
  };

  return (
    document.querySelector('#modal-root') &&
    ReactDOM.createPortal(
      <div
        ref={modalRef}
        className={`fixed inset-0 z-50 flex transform items-center justify-center overflow-y-hidden bg-black transition-all ease-in-out  ${
          isOpen ? 'visible bg-opacity-30' : 'pointer-events-none invisible  bg-opacity-0'
        }`}
        onClick={handleOverlayClick}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          className={cn(
            className,
            `relative grid w-full  transform rounded-3xl bg-white shadow-lg transition-all ease-in-out ${
              isOpen ? 'translate-y-0 transition-all' : 'translate-y-[100vh]'
            }`,
          )}
        >
          {children}

          {!isHiddenCloseButton && (
            <button
              onClick={onCloseModal}
              className={
                'absolute -right-10 -top-10 text-secondary transition-colors duration-500 hover:text-white'
              }
            >
              <X className={'h-10 w-10 '} />
            </button>
          )}
        </div>
      </div>,
      document.querySelector('#modal-root') as HTMLElement,
    )
  );
};

export default Modal;
