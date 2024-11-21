import EventsList from '../events-list/events-list';

import PromotionsList from '@/feature/promotions-list/promotions-list';
import { useGetPromotion } from '@/shared/hooks/query/use-get-promotions';

const PromotionsBlock = () => {
  const { data } = useGetPromotion();

  return (
    <div>
      <EventsList />
      {data?.news && data?.news?.length > 0 && (
        <PromotionsList title='Акции' items={data?.news} />
      )}
    </div>
  );
};

export default PromotionsBlock;
