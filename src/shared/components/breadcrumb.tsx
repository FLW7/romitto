import {
  type ReactNode,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentProps,
} from 'react';

import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

const Breadcrumb = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'nav'> & {
    separator?: ReactNode;
  }
>(({ ...properties }, reference) => (
  <nav ref={reference} aria-label='breadcrumb' {...properties} />
));

Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...properties }, reference) => (
    <ol
      ref={reference}
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-[16px] text-secondary',
        className,
      )}
      {...properties}
    />
  ),
);

BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...properties }, reference) => (
    <li
      ref={reference}
      className={cn('inline-flex items-center gap-1.5', className)}
      {...properties}
    />
  ),
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...properties }, reference) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={reference}
      className={cn('hover:text-foreground transition-colors', className)}
      {...properties}
    />
  );
});

BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...properties }, reference) => (
    <span
      ref={reference}
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('text-foreground font-normal', className)}
      {...properties}
    />
  ),
);

BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({
  children,
  className,
  ...properties
}: ComponentProps<'li'>) => (
  <li
    role='presentation'
    aria-hidden='true'
    className={cn('[&>svg]:size-3.5', className)}
    {...properties}
  >
    {children ?? <ChevronRight />}
  </li>
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...properties }: ComponentProps<'span'>) => (
  <span
    role='presentation'
    aria-hidden='true'
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...properties}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More</span>
  </span>
);

BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
