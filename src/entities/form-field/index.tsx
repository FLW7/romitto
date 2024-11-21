import { type FC, type InputHTMLAttributes, useState } from 'react';

import { CircleX, LoaderCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { getValueForType } from '@/entities/form-field/lib';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/components/form';
import { Input } from '@/shared/components/input';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
interface FullFormFieldProperties extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isLoading?: boolean;
  isClear?: boolean;
  fieldClassName?: string;
  error?: string;
}

export const FullFormField: FC<FullFormFieldProperties> = ({
  label,
  placeholder,
  name,
  isLoading,
  className,
  fieldClassName,
  disabled,
  type,
  onChange,
  onBlur,
  onFocus,
  isClear,
  error,
  ...other
}) => {
  const [focused, setFocused] = useState(false);
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      render={({ field }) => (
        <div className={fieldClassName}>
          <FormItem className={cn('relative')}>
            <FormLabel
              className={cn(
                'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-[400] text-secondary transition-all ',
                (focused || field.value) && 'top-[15px] text-[12px] font-[500] ',
                focused && 'text-main',
              )}
            >
              {label}
            </FormLabel>
            <FormControl>
              <>
                <Input
                  {...other}
                  {...field}
                  value={field.value || ''}
                  onChange={(event) => {
                    field.onChange(getValueForType({ value: event.target.value, type }));
                    onChange && onChange(event);
                  }}
                  onBlur={(e) => {
                    setFocused(false);
                    onBlur && onBlur(e);
                  }}
                  onFocus={(e) => {
                    setFocused(true);
                    onFocus && onFocus(e);
                  }}
                  type={type}
                  disabled={disabled}
                  className={cn(
                    className,
                    (focused || field.value) && 'pt-3',
                    focused && 'border-main',
                    !!error && '!border-error text-error',
                  )}
                />
                {isClear && !!field.value && !isLoading && !disabled && (
                  <button
                    className={'absolute right-4 top-1/2 block  -translate-y-1/2'}
                    onClick={() => {
                      field.onChange('');
                    }}
                  >
                    <CircleX className={cn(!!error && 'text-error', 'h-4 w-4')} />
                  </button>
                )}
              </>
            </FormControl>
            {isLoading && (
              <div className={'absolute right-4 top-1/2 block  -translate-y-1/2'}>
                <LoaderCircle className={'h-5 w-5 animate-spin text-main'} />
              </div>
            )}
          </FormItem>
          {error && (
            <Typography
              variant={'desc'}
              className={'mt-2 text-xs font-semibold !text-error'}
            >
              {error}
            </Typography>
          )}
        </div>
      )}
      name={name}
    />
  );
};
