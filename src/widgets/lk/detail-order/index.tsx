import React from 'react';

import { Loader } from 'lucide-react';

import StarIcon from '@/assets/icons/star.svg';
import { Button } from '@/shared/components/button';
import Typography from '@/shared/components/typography';
import { toast } from '@/shared/components/use-toast';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/state/modal';
import { useCart } from '@/widgets/cart-widget/state';
import { LINES } from '@/widgets/lk/detail-order/const';
import { Card } from '@/widgets/lk/detail-order/el/card';
import { Stroke } from '@/widgets/lk/detail-order/el/stroke';
import { DetailOrderEnum } from '@/widgets/lk/detail-order/enum';
import { covertValueForDetailOrder } from '@/widgets/lk/detail-order/lib';
import { useGetDetailOrder } from '@/widgets/lk/detail-order/model/use-get-detail-order';
interface Props {
  id?: string;
}

export const DetailOrder = ({ id }: Props) => {
  const { onOpen, onClose } = useModal();
  const { data, isLoading } = useGetDetailOrder(id);

  const { data: catalog } = useGetCatalog();

  const { clearCart, addPlate } = useCart();

  const isNoRating = Array.isArray(data?.Rating);

  if (isLoading) {
    return (
      <div className={'flex h-[90vh] w-[500px] items-center justify-center'}>
        <Loader className={'animate-spin'} />
      </div>
    );
  }

  const repeatOrderHandler = () => {
    const orderPlates = data?.plates.map((item) => {
      return {
        ...catalog?.plates.find((el) => el.id.toString() === Number(item.id).toString()),
        id: Number(item.id),
        countInCart: Number(item.count),
      };
    });

    if (orderPlates?.length ?? false) {
      clearCart();
      for (const item of orderPlates ?? []) {
        if (item.id && item.values && item.maxCount && item.name) {
          addPlate({
            ...item,
            id: item.id ?? 0,
            values: item.values ?? [],
            is_only_for_stories: item.is_only_for_stories ?? 0,
            itemOrder: item.itemOrder ?? 0,
            parentID: item.parentID ?? 0,
            categoryID: item.categoryID ?? 0,
            isSubCategory: item.isSubCategory ?? 0,
            IsPartPizza: item.IsPartPizza ?? 0,
            maxCount: item.maxCount ?? 0,
            name: item.name ?? '',
            sizes: item.sizes ?? [],
            thumbnailPicture: item.thumbnailPicture ?? '',
            isHit: item.isHit ?? 0,
            isNew: item.isNew ?? 0,
            isSpicy: item.isSpicy ?? 0,
            isSeason: item.isSeason ?? 0,
            composition: item.composition ?? '',
            calories: item.calories ?? 0,
            carbohydrates: item.carbohydrates ?? 0,
            fats: item.fats ?? 0,
            proteins: item.proteins ?? 0,
            recomendations: item.recomendations ?? [],
            allergenes: item.allergenes ?? [],
            price: Number(item.values[0]?.price),
            canHaveSale: item.canHaveSale ?? '0',
            useSizesDropdown: item.useSizesDropdown ?? '',
          });
          toast({
            title: `Блюда добавлены в корзину`,
            variant: 'main',
          });
          onClose();
        } else {
          toast({
            title: `Не удалось повторить заказ`,
            variant: 'main',
          });
        }
      }
    }
  };

  return (
    <div
      className={'scrollbar-thin relative my-10 max-h-[90vh] overflow-y-auto md:px-10'}
    >
      <div className={'mb-6'}>
        <Typography variant={'h6'} className={'mb-2 text-center'}>
          Заказ #{data?.orderID} {data?.status}
        </Typography>
        <Typography variant={'desc'} className={'text-secondaryxt text-center'}>
          Спасибо, что выбрали нас!
        </Typography>
      </div>
      <div className={'mb-8 space-y-2'}>
        {data?.plates?.map((plate, index) => <Card plate={plate} key={index} />)}
      </div>

      <div className={'mb-8 space-y-3 px-4 md:p-0 '}>
        {LINES.map((line, index) => (
          <Stroke
            key={index}
            value={covertValueForDetailOrder(
              line,
              data?.[line as keyof typeof data] as string,
            )}
            title={DetailOrderEnum[line as keyof typeof DetailOrderEnum]}
          />
        ))}
      </div>

      {!isNoRating && (
        <div
          className={'mb-4 flex flex-col gap-3 rounded-xl border border-primary/10 p-4'}
        >
          <div className={'flex items-center gap-0.5'}>
            {Array.from({ length: (data?.Rating?.Stars ?? 0) - 1 }).map((_, index) => (
              <StarIcon key={index} className={'h-8 w-8 fill-yellow'} />
            ))}

            <Typography variant={'p2'} className={'ml-4'}>
              {data?.Rating?.Comment}
            </Typography>
          </div>
        </div>
      )}

      <div
        className={
          'sticky bottom-0 flex flex-col-reverse justify-between gap-2 bg-bgMain px-4 pt-4 md:flex-row md:px-0'
        }
      >
        <Button
          variant={'outline'}
          className={cn(
            isNoRating && data?.status === 'Завершен' ? 'md:w-[250px]' : 'md:w-full',
          )}
          onClick={repeatOrderHandler}
        >
          Повторить заказ
        </Button>
        {isNoRating && data?.status === 'Завершен' && (
          <Button
            className={'md:w-[250px]'}
            onClick={() => {
              onOpen('rateOrder', { id: data?.orderID });
            }}
          >
            Оценить заказ
          </Button>
        )}
      </div>
    </div>
  );
};
