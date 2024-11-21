import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem } from '@/shared/components/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/input-otp';
interface FieldInputOtpProps {
  name: string;
}
export const FieldInputOtp = ({ name }: FieldInputOtpProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <InputOTP maxLength={4} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};
