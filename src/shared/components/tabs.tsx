'use client';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/shared/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...properties }, reference) => (
  <TabsPrimitive.List
    ref={reference}
    className={cn(
      'text-muted-foreground h-12.5 inline-flex w-full items-center justify-center rounded-full bg-cartBg p-1',
      className,
    )}
    {...properties}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...properties }, reference) => (
  <TabsPrimitive.Trigger
    ref={reference}
    className={cn(
      'inline-flex grow items-center justify-center whitespace-nowrap rounded-full px-3 py-2.5 text-start text-sm font-medium text-secondary transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-bgSecondary data-[state=active]:text-primary data-[state=active]:shadow-sm',
      className,
    )}
    {...properties}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...properties }, reference) => (
  <TabsPrimitive.Content
    ref={reference}
    className={cn(' mt-2 focus-visible:outline-none', className)}
    {...properties}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
