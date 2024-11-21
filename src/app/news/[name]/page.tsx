'use client';

import { useEffect, useState } from 'react';

import { type IPromotionItem } from '@/entities/promotion-card/types';
import PromotionView from '@/entities/promotion-view/promotion-view';
import Typography from '@/shared/components/typography';
import { useGetNews } from '@/shared/hooks/query/use-get-news';

const NewsDetail: React.FC<{ params: { name: string } }> = ({ params }) => {
  const { name } = params;
  const { data } = useGetNews();
  const [item, setItem] = useState<IPromotionItem | null>(null);

  useEffect(() => {
    setItem(
      data?.news.find(
        (item) =>
          item.name.toLowerCase().trim() ===
          decodeURIComponent(name)?.toLowerCase().trim(),
      ) ?? null,
    );
  }, [data, name]);

  return item ? (
    <main className='mx-auto min-h-[calc(100vh-400px)] max-w-[1304px] px-[40px] max-xl:p-0 max-lg:min-h-[calc(100vh-100px)]'>
      <div className='mt-8'>
        <PromotionView item={item} type='Новости' />
      </div>
    </main>
  ) : (
    <main className='mx-auto mt-[50px] flex min-h-[calc(100vh-400px)] max-w-[1304px] justify-center px-[40px] max-xl:p-0 max-lg:min-h-[calc(100vh-100px)]'>
      <Typography variant='h1' className='text-primary'>
        Новость не найдена
      </Typography>
    </main>
  );
};

export default NewsDetail;
