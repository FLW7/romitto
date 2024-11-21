import React from 'react';

import { Label } from '@/shared/components/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/radio-group';
import { cn } from '@/shared/lib/utils';

interface RadioGroupPayProps {
  checked: string | undefined;
  setChecked: (value: string) => void;
  data: Array<{ paymentType: string; isNeedToChangeCash: '0' | '1' }>;
}

const renderValue = (value: string) => {
  switch (value) {
    case '0': {
      return 'Наличными при получении';
    }
    case '1': {
      return 'Картой при получении';
    }
    case '2': {
      return 'Картой онлайн';
    }

    default: {
      return '';
    }
  }
};

const RadioGroupPay: React.FC<RadioGroupPayProps> = ({ checked, setChecked, data }) => {
  return (
    <RadioGroup onValueChange={setChecked} className='flex flex-col gap-y-4'>
      {data?.map((item) => {
        const val = renderValue(item.paymentType);

        return (
          <div key={item.paymentType} className='flex items-center space-x-2'>
            <RadioGroupItem
              checked={checked === val}
              variant='round'
              value={val}
              id={`option-${item.paymentType}`}
            />
            <Label
              htmlFor={`option-${item.paymentType}`}
              className={cn(
                'font-normal',
                checked === val ? 'text-main' : 'text-primary',
              )}
            >
              {val}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default RadioGroupPay;
