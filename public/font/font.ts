import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// define a custom local font

const inter = Inter({ subsets: ['latin'] });

const gilroy = localFont({
  src: [
    {
      path: './Gilroy/Gilroy-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Gilroy/gilroy-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Gilroy/gilroy-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Gilroy/gilroy-semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Gilroy/gilroy-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Gilroy/Gilroy-Extrabold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
});

const impact = localFont({
  src: [
    {
      path: './Impact/impact.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export { gilroy, inter, impact };
