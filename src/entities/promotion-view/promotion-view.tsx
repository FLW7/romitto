import { useEffect } from 'react';

import './style.css';

import Link from 'next/link';

import BackArrowIcon from '@/assets/icons/arrow-left.svg';
import { type IPromotionItem } from '@/entities/promotion-card/types';
import Typography from '@/shared/components/typography';

interface IPromotionViewProps {
  item: IPromotionItem;
  type: 'Акции' | 'Новости';
}

const PromotionView: React.FC<IPromotionViewProps> = ({ item, type }) => {
  const { name, html } = item;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col p-4'>
      <div className='flex gap-x-8 max-md:gap-x-4'>
        <Link href={`/${type === 'Акции' ? 'promotions' : 'news'}`}>
          <BackArrowIcon
            className={'h-[32px] w-[32px] cursor-pointer max-md:h-[16px] max-md:w-[16px]'}
          />
        </Link>
        <Typography variant='h1' className='mb-8'>
          {name}
        </Typography>
      </div>

      <article className='prose max-w-full'>
        {<div dangerouslySetInnerHTML={{ __html: html }}></div>}
      </article>
    </div>
  );
};

export default PromotionView;
