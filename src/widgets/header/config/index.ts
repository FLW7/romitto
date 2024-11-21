import { ROUTES } from '@/shared/const/routes';

export const config = {
  title: 'Шаверно',
  phone: '+7 (999) 999-99-99',
  links: [
    {
      id: 1,
      text: 'Акции',
      link: ROUTES.news,
    },
    {
      id: 2,
      text: 'Франчайзинг',
      link: 'https://franch.tuna-shop.ru/',
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
