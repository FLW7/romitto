'use client';

import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...properties }, reference) => (
  <DialogPrimitive.Overlay
    ref={reference}
    className={cn(
      ' fixed inset-0 z-40 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...properties}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    hideCloseButton?: boolean;
    classNameOverlay?: string;
    onClose?: () => void;
    customCloseButton?: React.ReactNode;
  }
>(
  (
    {
      className,
      children,
      customCloseButton,
      hideCloseButton,
      classNameOverlay,
      onClose,
      ...properties
    },
    reference,
  ) => (
    <DialogPortal>
      <DialogOverlay className={classNameOverlay} />
      <DialogPrimitive.Content
        ref={reference}
        className={cn(
          'bg-background fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg outline-none !duration-300 !ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-[100vh] data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-bottom-[100vh] data-[state=open]:slide-in-from-left-1/2 sm:rounded-3xl sm:px-16 md:py-10',

          className,
        )}
        {...properties}
      >
        {children}
        {customCloseButton}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            onClick={onClose}
            className='data-[state=open]:text-muted-foreground absolute right-2 top-5 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/20 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none sm:-right-[42px] sm:-top-10 sm:bg-none2'
          >
            <X size={35} color='white' strokeWidth={2} />

            {/* <span className='sr-only'>Close</span> */}
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-4 text-center sm:text-left', className)}
    {...properties}
  />
);

DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...properties}
  />
);

DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...properties }, reference) => (
  <DialogPrimitive.Title
    ref={reference}
    className={cn('text-[24px] font-[600] leading-none tracking-tight', className)}
    {...properties}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...properties }, reference) => (
  <DialogPrimitive.Description
    ref={reference}
    className={cn('text-center text-[16px] text-secondary', className)}
    {...properties}
  />
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
