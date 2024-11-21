'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

import { SidebarInset, SidebarProvider } from '../components/sidebar';
import useMediaQuery from '../hooks/use-media-query';

import CartSidebar from '@/widgets/cart-sidebar';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1_800_000, // 30 minutes
            gcTime: 1_800_000, // 30 minutes
          },
        },
      }),
  );

  const isTablet = useMediaQuery('(max-width:1460px)');

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {isTablet ? (
          <main>{children}</main>
        ) : (
          <SidebarProvider defaultOpen={false}>
            <SidebarInset>
              <main>{children}</main>
            </SidebarInset>
            <CartSidebar />
          </SidebarProvider>
        )}
      </ReactQueryStreamedHydration>
      {/* {<ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  );
}
