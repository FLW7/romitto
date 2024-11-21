import type { Metadata } from 'next';

import { inter } from '../../public/font/font';

import { COMPANY_NAME, META_DESCRIPTION } from '@/global-config';
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
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />

        {/* <Script src='//code.jivo.ru/widget/DtNxZF503q' strategy='lazyOnload' /> */}
      </head>

      <body
        className={cn(
          inter.className,
          'scrollbar-none min-h-screen scroll-smooth bg-white',
        )}
      >
        <Provider>
          <Wrapper site={data}>{children}</Wrapper>
          {modal}
        </Provider>
        <Toaster />
      </body>
      <div id='modal-root' />
    </html>
  );
}
