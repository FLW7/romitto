import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import PhoneIcon from '@/assets/icons/phone-solid.svg';
import Typography from '@/shared/components/typography';
import { getOnlyNumbers, phoneMask } from '@/shared/lib/phone-mask';
import { cn } from '@/shared/lib/utils';
import { type IOrganizationItem } from '@/widgets/restaurants/rest-lists/type';

interface RestCardProps {
  isActive?: boolean;
  item: IOrganizationItem;
  onClick: () => void;
  id: string;
}

export const RestCard = ({ item, onClick, isActive, id }: RestCardProps) => {
  const { thumbnailPicture, address, timetableDescription, phone } = item;

  return (
    <div
      id={'rest_' + id}
      className={cn(
        'flex flex-col gap-3 rounded-[12px] shadow-cardLk transition-colors  lg:flex-row lg:p-4 lg:px-6 lg:py-5 lg:shadow-none lg:hover:bg-main/10',
        isActive && 'bg-main/10',
      )}
    >
      <div
        className={
          'relative m-4 flex h-full min-h-[160px] grow sm:min-w-[220px] sm:max-w-[220px] lg:m-0'
        }
        onClick={onClick}
      >
        <Image
          src={thumbnailPicture}
          alt={'rest'}
          fill
          className={'rounded-[8px] object-cover'}
        />
      </div>

      <div className={'flex grow flex-col  gap-4 '} onClick={onClick}>
        <Typography variant={'p2'} className={'px-4 font-semibold lg:px-0 '}>
          {address}
        </Typography>

        <ul className={'px-4 lg:px-0'}>
          <article className={'prose mb-2 !text-sm '}>
            <div dangerouslySetInnerHTML={{ __html: timetableDescription }} />
          </article>

          <Link
            href={`tel:${getOnlyNumbers(phoneMask(phone))}`}
            className={'hidden lg:block'}
          >
            <Typography variant={'desc'} className={'text-secondary'}>
              <span className={'font-semibold text-primary'}>Тел:</span> {phone}
            </Typography>
          </Link>
        </ul>
      </div>
      <Link
        href={`tel:${getOnlyNumbers(phoneMask(phone))}`}
        className={
          'mt-auto flex h-fit cursor-pointer items-center justify-between rounded-b-[12px] p-4 transition-colors hover:bg-black/10 sm:cursor-auto lg:justify-end lg:p-0 lg:hover:bg-none'
        }
      >
        <Typography variant={'p'} className={'font-semibold lg:hidden'}>
          {phone}
        </Typography>

        <button className={'center h-[36px] w-[36px] rounded-full bg-main '}>
          <PhoneIcon className={'h-6 w-6'} />
        </button>
      </Link>
    </div>
  );
};
