export function convertDateFormat(dateString?: string, locale: string = 'ru-RU'): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(locale, options);
}

export default convertDateFormat;
