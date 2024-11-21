import { formatDate } from '@/shared/lib/format-date';

export const getDaysArray = (
  start?: Date,
  interval = 5,
  maxDeliveryHour = 22,
): string[] => {
  const today = start ?? new Date();

  const arr = Array.from({ length: interval }).map((_, i) =>
    formatDate(new Date(new Date().setDate(today.getDate() + Number(i + 1)))),
  );

  // Формируем массив дней
  const days: string[] = [];

  if (today.getHours() < maxDeliveryHour - 1) days.push(formatDate(today));

  const result: string[] = days.concat(arr);

  return result;
};

const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function parseDate(dateString: string, hours: number, minutes: number): Date {
  const today = new Date();

  const currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  if (dateString.toLowerCase() === 'сегодня') {
    today.setHours(hours);
    today.setMinutes(minutes);

    return today;
  } else if (dateString.toLowerCase() === 'завтра') {
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(hours);
    tomorrow.setMinutes(minutes);

    return tomorrow;
  } else {
    const [day, monthName] = dateString.split(' ');
    const dayNumber = Number.parseInt(day, 10);
    const monthIndex = monthNames.indexOf(monthName.toLowerCase()) + 1;

    if (monthIndex < currentMonth) {
      currentYear += 1;
    }

    return new Date(currentYear, monthIndex - 1, dayNumber, hours, minutes);
  }
}

export const dateFormatter = (date: Date): string => {
  const now = new Date();
  const inputDate = new Date(date);
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const diffDays = Math.round(Math.abs((inputDate.getTime() - now.getTime()) / oneDay));

  if (diffDays === 0) {
    return 'сегодня';
  } else if (diffDays === 1) {
    return 'завтра';
  } else {
    return `${inputDate.getDate()} ${monthNames[inputDate.getMonth()]}`;
  }
};
