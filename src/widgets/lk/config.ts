import { ROUTES } from '@/shared/const/routes';

export const LkConfig = {
  title: 'Личный кабинет',
  mobTitle: 'Профиль',
  favorite: 'Избранное',
  breadcrumbs: [
    { name: 'Главная', path: ROUTES.home },
    { name: 'Личный кабинет', path: ROUTES.lk },
  ],
  order: {
    title: 'История заказов',
    empty: 'Пусто...',
    emptyDesc: 'Здесь будет храниться ваша история заказов',
    emptyBtn: 'В меню',
  },
};
