import { OPTIONS } from './const';

import { type FormType } from './';

import { plural } from '@/shared/lib/plural';

export const getText = (star: number) => {
  const figure = {
    1: 'одну',
    2: 'две',
    3: 'три',
    4: 'четыре',
  };

  return `Вы поставили ${figure[star as keyof typeof figure]} ${plural(star, 'звезду', 'звезды', 'звезд')}. Что вам не понравилось?`;
};

export const getActiveOptions = (data: FormType): string => {
  const options = OPTIONS.filter((el) => data[el.name as keyof FormType])
    .map((el) => el.title)
    .join('\\');

  return options ?? '';
};
