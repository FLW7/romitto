import { ProductCard } from '@/entities/product-card';
import { useGetFavourites } from '@/shared/hooks/query/use-get-favourites';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';

export const FavoritesLists = () => {
  const { data } = useGetFavourites();
  const filtered = data?.plates;

  const { onOpen } = useModal();

  const openModal = (item: ICartOrderItem) => {
    onOpen('detailMeal', item);
  };

  return (
    <main className={'mt-6 min-h-[calc(100vh-178px)] max-md:mt-5'}>
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-2 min-[1200px]:grid-cols-3 2xl:grid-cols-4'>
        {filtered?.map((item) => (
          <ProductCard
            key={item.id}
            item={{ ...item, price: Number(item?.values?.[0].price) }}
            handleOpenModal={openModal}
          />
        ))}
      </div>
    </main>
  );
};
