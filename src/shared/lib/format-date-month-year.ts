export function formatDateMonthYear(date: Date): string {
  const year = date.getFullYear();
  const monthNames = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  const month = monthNames[date.getMonth()];

  return `${month} ${year}`;
}
