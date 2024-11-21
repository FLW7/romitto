import { type FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/shared/components/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/components/form';
import { cn } from '@/shared/lib/utils';
interface CheckboxFieldProperties {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
}
export const CheckboxField: FC<CheckboxFieldProperties> = ({
  name,
  label,
  className,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(className, 'flex flex-row items-center space-x-3 space-y-0')}
        >
          <FormControl>
            <Checkbox
              {...field}
              checked={field.value}
              disabled={disabled}
              onCheckedChange={(value) => {
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormLabel className='text-sm'>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};
