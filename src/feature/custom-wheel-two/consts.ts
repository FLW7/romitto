export const MONTHS: string[] = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const currentYear = new Date().getFullYear();

export const YEARS: number[] = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, index) => 1900 + index,
);
