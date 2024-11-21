import { useState } from 'react';

import PromotionCard from '@/entities/promotion-card';
import { type IPromotionItem } from '@/entities/promotion-card/types';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';

interface IPromotionsListProps {
  title: 'Акции' | 'Новости';
  items: IPromotionItem[] | undefined;
}

const PromotionsList: React.FC<IPromotionsListProps> = ({ items, title }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showAll, setShowAll] = useState(false);

  const getStyles = () => {
    if (items?.length === 1) return 'grid-cols-1 md:grid-cols-2';
    if (items?.length === 2) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    if (items?.length ?? 0 >= 3)
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  const handleMoreBtn = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className='mb-[100px] mt-6 max-md:p-4'>
      <Typography variant='h1'>{title}</Typography>
      <ul className={`mt-8 grid gap-5 ${getStyles()}`}>
        {items?.map((item, key) =>
          !isMobile || key <= 1 || showAll ? (
            <PromotionCard key={key} item={item} type={title} />
          ) : null,
        )}
        {isMobile && (items?.length ?? 0) > 2 && (
          <Button variant={'outline'} onClick={handleMoreBtn}>
            {showAll ? 'Скрыть' : 'Показать еще'}
          </Button>
        )}
      </ul>
    </div>
  );
};

export default PromotionsList;
