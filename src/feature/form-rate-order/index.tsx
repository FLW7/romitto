import React, { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import ClipIcon from '@/assets/icons/clip.svg';
import CloseIcon from '@/assets/icons/close.svg';
import StarIcon from '@/assets/icons/star.svg';
import { CheckboxField } from '@/entities/checkbox-field';
import { STARS } from '@/feature/form-rate-order/const';
import { getText } from '@/feature/form-rate-order/lib';
import { useGetRateOptions } from '@/feature/form-rate-order/model/use-get-rate-options';
import { useRateOrder } from '@/feature/form-rate-order/model/use-rate-order';
import { Button } from '@/shared/components/button';
import { Form } from '@/shared/components/form';
import { Textarea } from '@/shared/components/textarea';
import Typography from '@/shared/components/typography';
import { useToast } from '@/shared/components/use-toast';
import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/state/modal';

const formSchema = z.object({
  comment: z.string().optional(),
  stars: z.number(),
  options: z
    .array(
      z.object({
        key: z.string(),
        checked: z.boolean(),
        label: z.string(),
        IsPositive: z.string(),
      }),
    )
    .optional(),
});

export type FormType = z.infer<typeof formSchema>;

const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.codePointAt(i) as number;
  }

  const blob = new Blob([int8Array], { type: 'image/jpeg' });

  return blob;
};

export const FormRateOrder = () => {
  const { data: modalState } = useModal();
  const { data: options } = useGetRateOptions();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isMaxImage = images.length >= 3;
  const { mutate } = useRateOrder(modalState?.id);
  const [activeStar, setActiveStar] = useState(0);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  const star = form.watch('stars');

  const handleMouseOver = (star: number) => {
    setActiveStar(star);
  };

  const handleMouseLeave = () => {
    setActiveStar(0);
  };

  const onSubmit = (data: FormType) => {
    const formData = new FormData();

    formData.append('Stars', data.stars.toString());
    formData.append('Comment', data.comment ?? '');
    modalState?.id && formData.append('OrderID', modalState?.id);
    formData.append(
      'Options',
      data.options
        ?.filter((el) => el.checked)
        ?.map((el) => el.label)
        ?.join('\\') ?? '',
    );

    for (const [index, image] of images.entries()) {
      const blob = dataURItoBlob(image);

      formData.append(`Images${index}`, blob);
    }

    mutate(formData);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const input = event.target;

    if (files) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          if (file.size > 4 * 1024 * 1024) {
            toast({
              title: 'Не удалось загрузить изображение.',
              description: 'Изображение слишком большое. Максимальный размер - 15 Мб.',
              variant: 'destructive',
            });
            input.value = '';
            continue;
          }
          const reader = new FileReader();

          reader.addEventListener('load', (e) => {
            const target = e.target;

            if (target && typeof target.result === 'string') {
              setImages((prevImages) => [...prevImages, target.result as string]);
            }
          });
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handleDeletePhoto = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Form {...form}>
      <form className={'mb-10 space-y-6 md:mb-0'} onSubmit={form.handleSubmit(onSubmit)}>
        <Typography variant={'desc'} className={'text-center text-secondary'}>
          {!star && 'Оцените качество обслуживания'}
          {!!star && getText(star)}
        </Typography>

        <Controller
          control={form.control}
          name={'stars'}
          render={({ field: { value, onChange } }) => (
            <div className={'flex justify-center'}>
              {STARS.map((star) => (
                <button
                  className={'px-1'}
                  type={'button'}
                  key={star}
                  onMouseOver={() => {
                    handleMouseOver(star);
                  }}
                  onClick={() => {
                    onChange(star);

                    form.setValue(
                      'options',
                      options
                        ?.filter((el) =>
                          star >= 4 ? el.IsPositive === '1' : el.IsPositive === '0',
                        )
                        ?.map((option) => ({
                          key: option.ID,
                          checked: false,
                          label: option.OptionText,
                          IsPositive: option.IsPositive,
                        })),
                    );
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <StarIcon
                    className={cn(
                      activeStar >= star || value >= star ? 'fill-yellow' : '',
                      'h-10 w-10 active:scale-95',
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        />
        {!!star &&
          fields?.map((field, index) => (
            <div key={field.id}>
              <CheckboxField
                name={`options.${index}.checked`}
                label={field.label}
                className={'my-4'}
              />
            </div>
          ))}

        <Controller
          control={form.control}
          name={'comment'}
          render={({ field }) => (
            <div className={'relative'}>
              <Textarea
                placeholder='Комментарий к заказу...'
                {...field}
                maxLength={300}
                className={'p-6'}
              />
              <Typography
                variant={'desc'}
                className={'absolute bottom-2 right-2 text-right text-xs text-secondary'}
              >
                {field.value?.length ?? 0} / 300
              </Typography>
              <button
                disabled={isMaxImage}
                type={'button'}
                onClick={handleClick}
                className={
                  'absolute right-2 top-2 disabled:cursor-not-allowed disabled:opacity-40'
                }
              >
                <ClipIcon />
              </button>
              <input
                type={'file'}
                ref={fileInputRef}
                onChange={handleUpload}
                multiple
                style={{ display: 'none' }}
              />
            </div>
          )}
        />

        <div className={'flex flex-wrap  gap-4'}>
          {images.map((image, index) => (
            <div className={'relative rounded-md shadow-cardLk'} key={index}>
              <button
                className={
                  'center absolute -right-2 -top-2 h-6 w-6 rounded-full bg-main '
                }
                onClick={() => {
                  handleDeletePhoto(index);
                }}
              >
                <CloseIcon className={'h-3 w-3'} />
              </button>
              <Image
                src={image}
                alt={'photo'}
                className={'h-24 w-24 rounded-md object-cover '}
                width={90}
                height={90}
              />
            </div>
          ))}
        </div>

        <Button className={'w-full'} disabled={!form.formState.isValid}>
          Отправить
        </Button>
      </form>
    </Form>
  );
};
