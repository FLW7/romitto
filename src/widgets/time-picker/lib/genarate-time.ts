export const generateTimeArray = (deliveryInterval = 30): string[] => {
  const deliveryStartHour = 8;
  const deliveryEndHour = 21;
  const currentTime = new Date();
  const startTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    deliveryStartHour,
    0,
    0,
  );

  const endTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    deliveryEndHour,
    0,
    0,
  );

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
