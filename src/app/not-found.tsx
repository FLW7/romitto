import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { ROUTES } from '@/shared/const/routes';

export default function NotFound() {
  return (
    <div className={' flex h-screen w-full items-center justify-center'}>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <div className={'text-center'}>
        <h1 className={'text-gray-800 mb-4 text-8xl font-bold'}>404</h1>
        <p className={'text-gray-600 mb-8 text-2xl font-medium'}>
          Уупс! Страница не найдена.
        </p>
        <Link
          href={ROUTES.home}
          className={
            'bg-blue-500 hover:bg-blue-600 rounded px-6 py-3 font-medium text-blue focus:outline-none'
          }
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
