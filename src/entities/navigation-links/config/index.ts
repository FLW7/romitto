import { ROUTES } from '@/shared/const/routes';

export const config = {
  title: 'джонни тунец',
  phone: '8 (999) 000-99-99',
  links: [
    {
      id: 1,
      text: 'Акции',
      link: ROUTES.promotions,
    },
    {
      id: 2,
      text: 'Франчайзинг',
      link: ROUTES.lk,
    },
    {
      id: 3,
      text: 'Доставка и оплата',
      link: ROUTES.delivery,
    },
    {
      id: 4,
      text: 'Рестораны',
      link: ROUTES.restaurants,
    },
  ],
};
