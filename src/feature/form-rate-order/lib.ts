import { plural } from '@/shared/lib/plural';

export const getText = (star: number) => {
  const figure = {
    1: 'одну',
    2: 'две',
    3: 'три',
    4: 'четыре',
    5: 'пять',
  };

  if (star >= 4) {
    return `Вы поставили ${figure[star as keyof typeof figure]} ${plural(star, 'звезду', 'звезды', 'звезд')}. Что вам понравилось?`;
  }

  return `Вы поставили ${figure[star as keyof typeof figure]} ${plural(star, 'звезду', 'звезды', 'звезд')}. Что вам не понравилось?`;
};
