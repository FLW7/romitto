/* eslint-disable @typescript-eslint/naming-convention */

import Image from 'next/image';
import Link from 'next/link';

import { type IPromotionItem } from './types';

import { Button } from '@/shared/components/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';

interface IPromotionCardProps {
  item: IPromotionItem;
  type: 'Акции' | 'Новости';
}

const PromotionCard: React.FC<IPromotionCardProps> = ({ item, type }) => {
  const { name, image, html_preview } = item;

  return (
    <Card className='flex w-full flex-col gap-x-[19px] overflow-hidden rounded-xl border-none shadow-cardLk'>
      <Image
        src={image}
        alt='promotion-img'
        width={188}
        height={185}
        className='max-h-[180px] min-w-full object-cover'
      />
      <div className='flex h-full flex-col justify-between py-4 pr-4'>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>{name}</CardTitle>
          <CardDescription className='mt-3 line-clamp-3 max-w-full break-words text-base font-medium text-secondary'>
            {html_preview}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href={`/${type === 'Акции' ? 'promotions' : 'news'}/${encodeURIComponent(name)}`}
          >
            <Button variant={'ghost'} className='p-0 text-sm font-semibold text-main'>
              Подробнее
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PromotionCard;
