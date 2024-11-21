/* eslint-disable unicorn/no-nested-ternary */
import { useEffect, type Dispatch, type SetStateAction } from 'react';

import { type DateOrder, type IDelivery } from '@/shared/api/get-min-delivery-price';
import { type GetReservationsDataOrgIDResponse } from '@/widgets/modal/book-table-date-picker/type';
import TimePickerOrder from '@/widgets/time-picker-order/index';

interface Props {
  delivery?: GetReservationsDataOrgIDResponse | IDelivery;
  deliveryTime: { date: string; time: string } | undefined;
  setDeliveryTime: Dispatch<SetStateAction<{ date: string; time: string } | undefined>>;
}

export const TimePickerWrap = ({ delivery, setDeliveryTime, deliveryTime }: Props) => {
  const daysArray = delivery
    ? Object.keys(delivery?.allowedOrderTimeList)?.map((item) => item)
    : null;

  const timeArrays = delivery
    ? Object.values(delivery?.allowedOrderTimeList)?.map((arr) =>
        arr.map((obj: DateOrder) => {
          return obj.isNow ? 'текущее' : obj.time;
        }),
      )
    : undefined;

  const currentHours = timeArrays
    ? deliveryTime
      ? timeArrays?.[daysArray?.indexOf(deliveryTime.date) ?? -1]
      : timeArrays?.[0] ?? [0]
    : [];

  useEffect(() => {
    if (delivery?.allowedOrderTimeList && !deliveryTime) {
      const firstDay = Object.entries(delivery?.allowedOrderTimeList)[0][0];
      const firstTime = Object.entries(delivery?.allowedOrderTimeList)[0][1][0];

      setDeliveryTime({
        date: firstDay,
        time: firstTime.isNow ? 'текущее' : firstTime.time,
      });
    }
  }, []);

  return (
    <TimePickerOrder
      date={deliveryTime}
      onDateChange={(val) => {
        setDeliveryTime(val);
      }}
      days={daysArray ?? []}
      hours={currentHours}
      // setCurrentHours={setCurrentHours}
      timesArray={timeArrays}
    />
  );
};
