import { Slash } from 'lucide-react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/components/breadcrumb';
import { cn } from '@/shared/lib/utils';

interface BreadcrumbsItem {
  name: string;
  path: string;
}

interface LkBreadcrumbsProperties {
  breadcrumbs: BreadcrumbsItem[];
}
export function Breadcrumbs({ breadcrumbs }: LkBreadcrumbsProperties) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className={'flex items-center gap-1.5'}>
            <BreadcrumbItem key={breadcrumb.name}>
              <BreadcrumbLink asChild>
                <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator
              className={cn(breadcrumbs.length - 1 === index && 'hidden')}
            >
              <Slash />
            </BreadcrumbSeparator>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
