import type { Metadata } from 'next';

import { inter } from '../../public/font/font';

import YandexMetrikaContainer from './metrika';

import { COMPANY_NAME, META_DESCRIPTION, YMERIKA_ID } from '@/global-config';
import { getSiteAccessibility } from '@/shared/api/get-site-accessibility';
import { Toaster } from '@/shared/components/toaster';
import { cn } from '@/shared/lib/utils';
import Provider from '@/shared/providers/providers';
import { Wrapper } from '@/widgets/wrapper';

import '../../public/styles/globals.css';

export const metadata: Metadata = {
  title: `${COMPANY_NAME}`,
  description: `${META_DESCRIPTION}`,
  icons: {
    icon: '/icons/logo.png',
  },
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  let data;

  try {
    data = await getSiteAccessibility();
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang='en'>
      <body
        className={cn(
          inter.className,
          'scrollbar-none min-h-screen scroll-smooth bg-bgMain',
        )}
      >
        <Provider>
          <Wrapper site={data}>{children}</Wrapper>
          {modal}
        </Provider>
        <Toaster />
      </body>
      <div id='modal-root' />
      <YandexMetrikaContainer enabled={false} ymIds={YMERIKA_ID} />
    </html>
  );
}
