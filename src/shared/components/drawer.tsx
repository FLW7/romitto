'use client';

import * as React from 'react';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/shared/lib/utils';

const Drawer = ({
  shouldScaleBackground = true,
  ...properties
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...properties} />
);

Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...properties }, reference) => (
  <DrawerPrimitive.Overlay
    ref={reference}
    className={cn('fixed inset-0 z-50 flex flex-col bg-black/80', className)}
    {...properties}
  />
));

DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    classNameOverlay?: string;
    closeTrigger?: boolean;
    classNameTrigger?: string;
  }
>(
  (
    {
      classNameTrigger,
      className,
      children,
      classNameOverlay,
      closeTrigger = true,
      ...properties
    },
    reference,
  ) => (
    <DrawerPortal>
      <DrawerOverlay className={`pointer-events-none ${classNameOverlay}`} />
      <DrawerPrimitive.Content
        ref={reference}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] bg-white outline-none',
          className,
        )}
        {...properties}
      >
        {closeTrigger && (
          <div
            className={cn(
              'absolute -top-8 right-[50%] z-50 mx-auto mt-4 h-[5px] w-[55px] translate-x-[50%] rounded-full bg-lightGrey2',
              classNameTrigger,
            )}
          />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  ),
);

DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...properties}
  />
);

DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...properties} />
);

DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...properties }, reference) => (
  <DrawerPrimitive.Title
    ref={reference}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...properties}
  />
));

DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...properties }, reference) => (
  <DrawerPrimitive.Description
    ref={reference}
    className={cn('text-muted-foreground text-sm', className)}
    {...properties}
  />
));

DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};