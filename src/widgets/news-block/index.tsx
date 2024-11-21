import PromotionsList from '@/feature/promotions-list/promotions-list';
import { useGetNews } from '@/shared/hooks/query/use-get-news';

const NewsBlock = () => {
  const { data } = useGetNews();

  return (
    <div>
      {data?.news && data?.news?.length > 0 && (
        <PromotionsList title='Новости' items={data?.news} />
      )}
    </div>
  );
};

export default NewsBlock;
