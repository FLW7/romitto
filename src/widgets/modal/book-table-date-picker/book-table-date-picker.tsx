'use client';

import { useEffect, useState } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { Button } from '@/shared/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/drawer';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { useAddress } from '@/shared/state/address';
import { useModal } from '@/shared/state/modal';
import { IsNotPossibleBook } from '@/widgets/modal/book-table-date-picker/el/is-not-possible-book';
import { useGetDateReservation } from '@/widgets/modal/book-table-date-picker/model/use-get-date-reservation';
import { TimePickerWrap } from '@/widgets/time-picker-order/time-picker-wrap';
type DateType = Record<string, Array<{ time: string }>>;
const BookTableDatePicker = () => {
  const { address } = useAddress();
  const { data: delivery } = useGetDateReservation(
    address?.LastAddressOrgID?.toString() ?? '',
  );
  const isNotPossibleBook =
    Object.keys(delivery?.allowedOrderTimeList ?? {}).length === 0;

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [deliveryTime, setDeliveryTime] = useState<{ date: string; time: string }>();
  const today = new Date();
  const tomorrow = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);

  const { isOpen, type, onClose, onOpen } = useModal();
  const isModalOpen = isOpen && type === 'bookTableDatePicker';

  useEffect(() => {
    if (!deliveryTime && !!delivery) {
      const firstKey = Object.keys(delivery?.allowedOrderTimeList ?? ({} as DateType))[0];
      const time =
        (delivery?.allowedOrderTimeList as DateType | undefined)?.[firstKey]?.[0]?.time ??
        '';

      setDeliveryTime({
        date: firstKey,
        time,
      });
    }
  }, [delivery]);

  if (isMobile) {
    return (
      <Drawer
        open={isModalOpen}
        onClose={() => {
          isModalOpen && onClose();
        }}
        dismissible={false}
      >
        <DrawerContent
          className={'scrollbar-thin bottom-0 h-[65vh] overflow-y-auto px-4'}
        >
          <DrawerHeader>
            <DrawerTitle className={'text-center'}>Забронировать стол</DrawerTitle>
            {!isNotPossibleBook && (
              <DrawerDescription>Выберите дату и время</DrawerDescription>
            )}
          </DrawerHeader>

          <div className={'mx-10 my-auto'}>
            {isNotPossibleBook ? (
              <IsNotPossibleBook />
            ) : (
              <TimePickerWrap
                delivery={delivery}
                deliveryTime={deliveryTime}
                setDeliveryTime={setDeliveryTime}
              />
            )}
          </div>
          <Button
            disabled={isNotPossibleBook}
            className={'mb-10 mt-auto'}
            onClick={() => {
              onOpen('bookTable', { date: deliveryTime });
            }}
          >
            Выбрать
          </Button>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'mx-auto max-w-md bg-white p-0 text-black'}>
        <button
          className={'absolute left-10 top-10'}
          onClick={() => {
            onOpen('choosingMyLocation');
          }}
        >
          <ArrowLeftIcon />
        </button>
        <DialogHeader>
          <DialogTitle className={'text-center'}>Забронировать стол</DialogTitle>
          {!isNotPossibleBook && (
            <DialogDescription>Выберите дату и время</DialogDescription>
          )}
        </DialogHeader>
        {isNotPossibleBook ? (
          <IsNotPossibleBook />
        ) : (
          <TimePickerWrap
            delivery={delivery}
            deliveryTime={deliveryTime}
            setDeliveryTime={setDeliveryTime}
          />
        )}
        <Button
          disabled={isNotPossibleBook}
          className={'mt-10'}
          onClick={() => {
            onOpen('bookTable', { date: deliveryTime });
          }}
        >
          Выбрать
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookTableDatePicker;
