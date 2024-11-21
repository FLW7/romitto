import { type MouseEvent } from 'react';
import * as React from 'react';

import BasketIcon from '@/assets/icons/basket.svg';
import EditIcon from '@/assets/icons/edit.svg';
import LocationIcon from '@/assets/icons/header/location.svg';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
interface AddressProperties {
  address: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick: () => void;
  className?: string;
  desc?: string;
  isActive?: boolean;
  isHiddenWorkTime?: boolean;
  hideEditIcon?: boolean;
  hideDeleteIcon?: boolean;
  id: string;
}

export function AddressField({
  id,
  address,
  desc,
  isHiddenWorkTime,
  onEdit,
  onDelete,
  className,
  onClick,
  hideEditIcon,
  hideDeleteIcon,
  isActive,
}: AddressProperties) {
  const handleEditClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit && onEdit();
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete && onDelete();
  };

  return (
    <div
      id={`address_${id}`}
      tabIndex={0}
      role={'button'}
      className={cn(
        isActive ? 'border-main bg-main/5' : 'border-primary/10',
        'flex  min-h-[65px] w-full  flex-col overflow-hidden  rounded-xl border px-3',
        className,
      )}
      onClick={onClick}
    >
      <div className={'flex w-full grow flex-col py-2'}>
        <div className='flex grow items-center justify-between '>
          <div className={'flex max-w-full items-center gap-2'}>
            <LocationIcon
              width={24}
              height={24}
              className={'mt-1 block min-h-[24px] min-w-[24px]'}
            />
            <div>
              <Typography
                variant={'p'}
                className={'line-clamp-2 !text-base font-semibold max-md:!text-sm'}
              >
                {address}
              </Typography>
              {!isHiddenWorkTime && desc && (
                <article
                  className={
                    ' mt-1 line-clamp-1 text-ellipsis !text-sm !font-semibold !text-secondary'
                  }
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: desc,
                    }}
                  />
                </article>
              )}
            </div>
          </div>

          <div className='flex space-x-2'>
            {!hideEditIcon && (
              <button type='button' onClick={handleDeleteClick}>
                <BasketIcon width={24} height={24} />
              </button>
            )}
            {!hideDeleteIcon && (
              <button type='button' onClick={handleEditClick}>
                <EditIcon width={24} height={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
