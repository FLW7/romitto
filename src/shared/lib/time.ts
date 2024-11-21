const formatTime = (hours: number, minutes: number) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export function convertTimeInterval(interval?: string): string {
  if (!interval) return '';
  const [start, end] = interval.split('-');
  const startHours = Math.floor(Number(start) / 100);
  const startMinutes = Number(start) % 100;
  const endHours = Math.floor(Number(end) / 100);
  const endMinutes = Number(end) % 100;

  return `${formatTime(startHours, startMinutes)} - ${formatTime(endHours, endMinutes)}`;
}
