import * as React from 'react';

import Image from 'next/image';

import styles from './style.module.css';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import PhoneIcon from '@/assets/icons/call-fill.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import Typography from '@/shared/components/typography';
import { phoneMask } from '@/shared/lib/phone-mask';
import { useModal } from '@/shared/state/modal';
import { type IOrganizationItem } from '@/widgets/restaurants/rest-lists/type';
interface Props {
  org: IOrganizationItem;
}

export const OrgDetail = ({ org }: Props) => {
  const { onClose } = useModal();
  const { thumbnailPicture, name, phone, description, city, timetableDescription } = org;

  const handleBack = () => {
    onClose();
  };

  return (
    <div className={'sm:overflow-hidden  sm:rounded-3xl '}>
      <div className={'sticky top-0 z-10 flex gap-4 bg-bgMain px-6 py-4 sm:hidden'}>
        <button type={'button'} onClick={handleBack} className={'outline-none'}>
          <ArrowLeftIcon className={'h-4 w-4 fill-secondary'} />
        </button>

        <Typography variant={'h6'} className={'line-clamp-2 font-semibold'}>
          {city} {name}
        </Typography>
      </div>

      <Image
        src={thumbnailPicture}
        alt={'rest'}
        className={'h-[280px] object-cover'}
        width={600}
        height={280}
      />
      <div className={'p-[18px]'}>
        <Typography variant={'h6'} className={'mb-6 hidden sm:block'}>
          {city} {name}
        </Typography>
        <Typography variant={'desc'} className={'mb-6 mt-4 sm:mt-0'}>
          {description}
        </Typography>

        <div className={'mb-4 flex gap-2'}>
          <div className={'center h-5  w-5 rounded-full '}>
            <PhoneIcon className={'h-5  w-5'} />
          </div>

          <Typography variant={'desc'} className={'text-secondary'}>
            Телефон
          </Typography>
          <Typography variant={'desc'}>{phoneMask(phone)}</Typography>
        </div>

        <div className={'mb-7 flex gap-2'}>
          <ClockIcon className={'h-5 w-5'} />

          <Typography variant={'desc'} className={'text-secondary'}>
            Время работы
          </Typography>

          <article className={'prose !text-sm'}>
            <div
              dangerouslySetInnerHTML={{ __html: timetableDescription }}
              className={styles.article}
            />
          </article>
        </div>
      </div>
    </div>
  );
};
