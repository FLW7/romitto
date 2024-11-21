import { type Dispatch, type SetStateAction } from 'react';

import { FormOrderCode } from '@/feature/form-order-code';
import { ResponsiveDialog } from '@/shared/components/responsive-dialog';

const PlacuingOrderCode: React.FC<{
  open: boolean;
  onClose: () => void;
  phone: string;
  setCode: Dispatch<SetStateAction<string | undefined>>;
  openConfirmPopup: () => void;
}> = ({ open, onClose, phone, setCode, openConfirmPopup }) => {
  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
      classNameOverlay='z-[100]'
      className='z-[101] bg-bgMain md:w-[600px]'
    >
      <div className='p-10'>
        <FormOrderCode
          phone={phone}
          setCode={setCode}
          openConfirmPopup={openConfirmPopup}
        />
      </div>
    </ResponsiveDialog>
  );
};

export default PlacuingOrderCode;
