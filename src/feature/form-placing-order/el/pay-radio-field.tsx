import { type ButtonHTMLAttributes, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import RadioGroupPay from './radio-group-pay';

import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/drawer';
import { FormField, FormItem, FormLabel } from '@/shared/components/form';
import { Select, SelectContent, SelectTrigger } from '@/shared/components/select';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/utils';

interface PayRadioFieldProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  checkedPay: string | undefined;
  radioHandler: (value: string) => void;
  data: Array<{ paymentType: string; isNeedToChangeCash: '0' | '1' }>;
  name: string;
  label: string;
}

const PayRadioField: React.FC<PayRadioFieldProps> = ({
  children,
  checkedPay,
  radioHandler,
  data,
  name,
  className,
  onFocus,
  onBlur,
  label,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  return isMobile ? (
    <FormField
      control={control}
      render={({ field }) => (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger
            {...field}
            className={cn(
              'h-[50px] w-full rounded-xl border border-primary/10 bg-bgSecondary p-0 pr-3',
              className,
              (open || focused) && 'border-main',
            )}
            onBlur={(e) => {
              setFocused(false);
              onBlur && onBlur(e);
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus && onFocus(e);
            }}
          >
            <div className='h-full w-full'>
              <FormItem className={cn('relative h-full')}>
                <FormLabel
                  className={cn(
                    'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-[400] text-secondary transition-all ',
                    // open && 'top-[15px] text-[12px] font-[500] ',
                    field.value && 'text-primary',
                    (open || focused) && 'text-main',
                  )}
                >
                  {field.value ?? label}
                </FormLabel>
              </FormItem>
            </div>
          </DrawerTrigger>
          <DrawerContent
            className='z-[101] bg-bgSecondary px-4 pb-12'
            classNameOverlay='z-[100]'
          >
            <Typography variant='h6' className='mb-5 mt-4'>
              Cпособ оплаты
            </Typography>
            <RadioGroupPay
              data={data}
              checked={checkedPay}
              setChecked={(val) => {
                radioHandler(val);
                setOpen(false);
              }}
            />
          </DrawerContent>
        </Drawer>
      )}
      name={name}
    />
  ) : (
    <FormField
      control={control}
      render={({ field }) => (
        <Select open={open} onOpenChange={setOpen}>
          <SelectTrigger
            {...field}
            className={cn(
              'h-[60px] w-full rounded-xl border-primary/10 bg-bgSecondary p-0 pr-3',
              className,
              (open || focused) && 'border-main',
            )}
            onBlur={(e) => {
              setFocused(false);
              onBlur && onBlur(e);
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus && onFocus(e);
            }}
          >
            <div className='h-full w-full'>
              <FormItem className={cn('relative h-full')}>
                <FormLabel
                  className={cn(
                    'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-[400] text-secondary transition-all ',
                    // open && 'top-[15px] text-[12px] font-[500] ',
                    field.value && 'text-primary',
                    (open || focused) && 'text-main',
                  )}
                >
                  {field.value ?? label}
                </FormLabel>
              </FormItem>
            </div>
          </SelectTrigger>
          <SelectContent
            align={'start'}
            className='z-[52] w-[366px] max-w-full border-none bg-bgSecondary p-3'
          >
            <RadioGroupPay
              data={data}
              checked={field.value}
              setChecked={(val) => {
                radioHandler(val);
                setOpen(false);
              }}
            />
          </SelectContent>
        </Select>
      )}
      name={name}
    />
  );
};

export default PayRadioField;
