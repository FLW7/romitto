export function getDateAndMonth(dateString: string) {
  const [day, month] = dateString.split('.');

  return {
    day,
    month,
  };
}
