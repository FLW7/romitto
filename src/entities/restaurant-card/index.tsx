import * as React from 'react';

import Image from 'next/image';

import styles from './styles.module.css';

import IconPhone from '@/assets/icons/phone-solid.svg';
import Typography from '@/shared/components/typography';
import { type IOrganizationItem } from '@/widgets/restaurants/rest-lists/type';

type Props = IOrganizationItem;
export const RestaurantCard = (props: Props) => {
  const { thumbnailPicture, address, phone, timetableDescription } = props;

  return (
    <div className='group relative flex h-full w-[343px] flex-col rounded-[16px] p-4 shadow-lg   sm:w-[480px] sm:p-5'>
      <div className='relative mb-3 h-[161px] w-full overflow-hidden rounded-xl sm:h-[210px] '>
        <Image
          src={thumbnailPicture}
          className='bg-black/5 object-cover transition-transform duration-300 group-hover:scale-110'
          fill
          alt='rest'
        />
      </div>
      <div className='mb-3 flex flex-col'>
        <Typography
          variant='h6'
          className='mb-1.5 line-clamp-3 !text-[16px] sm:mb-4 sm:!text-[20px]'
        >
          {address}
        </Typography>

        <article className={'mb-12 sm:mb-0'}>
          <div
            dangerouslySetInnerHTML={{ __html: timetableDescription }}
            className={styles.article}
          />
        </article>
        <div
          className={
            'absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-b-[16px] bg-grey px-3 py-3 sm:hidden'
          }
        >
          <Typography variant={'p2'} className={' font-semibold'}>
            {phone}
          </Typography>

          <button className={'center h-11 w-11 rounded-full bg-main'}>
            <IconPhone width={24} height={24} />
          </button>
        </div>

        <button
          className={'center ml-auto hidden h-11 w-11 rounded-full bg-main sm:flex'}
        >
          <IconPhone width={24} height={24} />
        </button>
      </div>
    </div>
  );
};
