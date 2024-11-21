export const ROUTES = {
  home: '/',
  lk: '/lk',
  restaurants: '/restaurants',
  delivery: '/delivery',
  promotions: '/promotions',
  contacts: '/contacts',
  favorite: '/favorite',
  cart: '/cart',
  bonus: '/bonus',
  vacancies: '/vacancies',
  menu: (id?: string) => (id ? `/menu?id=${id}` : '/menu'),
  news: '/news',
};
