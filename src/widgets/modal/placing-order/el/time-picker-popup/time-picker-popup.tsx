import { type SetStateAction, type Dispatch } from 'react';

import { Button } from '@/shared/components/button';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';
import { useGetMinDeliveryPrice } from '@/shared/hooks/query/use-get-min-delivery-price';
import { useAddress } from '@/shared/state/address';
import { TimePickerWrap } from '@/widgets/time-picker-order/time-picker-wrap';

interface TimePickerPoupProps {
  timePickerOpen: boolean;
  closeTimePicker: () => void;
  deliveryTime: { date: string; time: string } | undefined;
  setDeliveryTime: Dispatch<SetStateAction<{ date: string; time: string } | undefined>>;
}

const TimePickerPoup: React.FC<TimePickerPoupProps> = ({
  timePickerOpen,
  closeTimePicker,
  deliveryTime,
  setDeliveryTime,
}) => {
  const { address } = useAddress();
  const { data: delivery } = useGetMinDeliveryPrice(
    Number(address.LastPolygonID),
    Number(address.LastAddressOrgID),
    Number(address.LastAddressType),
    0,
  );

  return (
    <ResponsiveDialog
      open={timePickerOpen}
      onClose={closeTimePicker}
      classNameOverlay='z-[100]'
      className='min-w-auto z-[102] bg-bgMain md:min-w-[450px]'
    >
      <div className='px-[55px] pt-[54px] max-md:pt-4 md:pb-[60px]'>
        <TimePickerWrap
          delivery={delivery}
          deliveryTime={deliveryTime}
          setDeliveryTime={setDeliveryTime}
        />
        <Button className='mt-10 w-full max-md:mt-9' onClick={closeTimePicker}>
          Выбрать
        </Button>
      </div>
    </ResponsiveDialog>
  );
};

export default TimePickerPoup;
