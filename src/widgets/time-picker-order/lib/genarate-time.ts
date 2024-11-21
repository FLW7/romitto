export const generateTimeArray = (date: Date, deliveryInterval = 30): string[] => {
  const deliveryStartHour = 8;
  const deliveryEndHour = 22;
  // const deliveryInterval = 60;
  const currentTime = new Date();
  const startTime = new Date(date);

  if (startTime.getHours() > deliveryEndHour - 1) {
    startTime.setHours(deliveryStartHour, 0, 0, 0);
  }

  // Если дата сегодняшняя и текущее время меньше 22:00,
  // начинаем с текущего времени + 30 минут

  if (
    date.getDate() === currentTime.getDate() &&
    currentTime.getHours() < deliveryEndHour
  ) {
    startTime.setHours(currentTime.getHours() + 1, 0, 0, 0);
  } else {
    startTime.setHours(deliveryStartHour, 0, 0, 0);
  }

  const endTime = new Date(date);

  endTime.setHours(deliveryEndHour, 0, 0, 0);

  const timeInterval = deliveryInterval * 60 * 1000;
  const timeArray: string[] = [];

  let currentTimeStamp = startTime.getTime();

  while (currentTimeStamp <= endTime.getTime()) {
    const timeString = new Date(currentTimeStamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    timeArray.push(timeString);
    currentTimeStamp += timeInterval;
  }

  return timeArray;
};
