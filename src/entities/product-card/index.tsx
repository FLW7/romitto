/* eslint-disable unicorn/no-array-for-each */
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Counter from '../counter/counter';
import TagPlate from '../tag-plate';

import NotCatalogImg from '@/assets/icons/not-catalog-img.svg';
import SizesSelect from '@/feature/detail-meal/el/sizes-select';
import { Button } from '@/shared/components/button';
import PlusButton from '@/shared/components/plus-button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/tabs';
import { type Tab } from '@/shared/components/tabs-animate';
import Typography from '@/shared/components/typography';
import { toast } from '@/shared/components/use-toast';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { priceFormatter } from '@/shared/lib/price';
import { cn } from '@/shared/lib/utils';
import { useAddress } from '@/shared/state/address';
import { useModal } from '@/shared/state/modal';
import { type ICartOrderItem } from '@/widgets/cart-widget/config';
import { useCart, useCartOpen } from '@/widgets/cart-widget/state';

interface Props {
  className?: string;
  handleOpenModal: (item: ICartOrderItem) => void;
  item: ICartOrderItem;
}

export const ProductCard = ({ className, handleOpenModal, item }: Props) => {
  const { address } = useAddress();
  const { onOpen } = useModal();
  const cartOpen = useCartOpen();
  const { addPlate, changePlateCount, deletePlate, orders } = useCart();
  const lgScreen = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();
  const isLastAddress = !!address?.LastAddressID || !!address?.LastAddressOrgID;
  // const { data } = useGetFavourites();
  const [selectedSize, setSelectedSize] = useState('0');

  const hasRequiredItem =
    item.modifierBundles &&
    item.modifierBundles.some((bundle) => Number(bundle.minAmount) > 0);

  const addPlateHandler = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const addPlateCond = (item: ICartOrderItem) => {
      if (hasRequiredItem) {
        handleOpenModal(item);
      } else {
        addPlate({ ...item, price: Number(item.values[0]?.price) });
        toast({
          title: `Вы добавили "${item.name}" в свою корзину.`,
          description: (
            <Button
              variant={'link'}
              className='mt-2 p-0'
              onClick={() => {
                lgScreen ? router.push('/cart') : cartOpen.onOpen();
              }}
            >
              Просмотр корзины
            </Button>
          ),
          variant: 'success',
        });
      }
    };

    if (isLastAddress) {
      addPlateCond(item);
    } else if (hasRequiredItem) {
      onOpen('addressNotSpecified');
    } else {
      onOpen('addressNotSpecified', { addPlate: item });
    }
  };

  const addPlateWithSizes = () => {
    if (isLastAddress) {
      if (hasRequiredItem) {
        handleOpenModal(item);
      } else {
        addPlate({
          ...item,
          ...item.sizes[Number(selectedSize)],
          price: Number(item.sizes[Number(selectedSize)].price),
          id: Number(item.sizes[Number(selectedSize)].plateID),
          countInCart: 1,
        });
        toast({
          title: `Вы добавили "${item.name}" в свою корзину.`,
          description: (
            <Button
              variant={'link'}
              className='mt-2 p-0'
              onClick={() => {
                lgScreen ? router.push('/cart') : cartOpen.onOpen();
              }}
            >
              Просмотр корзины
            </Button>
          ),
          variant: 'success',
        });
      }
    } else if (hasRequiredItem) {
      onOpen('addressNotSpecified');
    } else {
      onOpen('addressNotSpecified', { addPlate: item });
    }
  };

  const countHandler = (value: number) => {
    if (value === 0) {
      deletePlate(item.id, undefined, item.values[0].mass);
    }

    changePlateCount(item.id, value, undefined, item.values[0].mass);
  };

  const tabsSizeList: Tab[] = item?.sizes?.map((i) => ({
    title: i.size,
    value: item?.sizes?.findIndex((el) => el.id === i.id).toString(),
  }));

  useEffect(() => {
    if (item?.sizes?.length > 1) {
      const defaultSize = item?.sizes?.findIndex(
        (el) => el?.plateID === item?.values?.[0]?.id,
      );

      setSelectedSize(String(defaultSize >= 0 ? defaultSize : 0));
    }
  }, []);

  const { data: catalog } = useGetCatalog();
  let price: string | null = null;

  item?.tags?.forEach((tagID) => {
    if (catalog?.tagsInfo?.[Number(tagID)]?.title?.includes('₽')) {
      price = catalog?.tagsInfo?.[Number(tagID)].title;
    }
  });

  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <div
      className={cn(
        className,
        'group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-productCart transition-all duration-500 max-[900px]:shadow-mobProductCart max-sm:h-full',
      )}
      onClick={() => {
        handleOpenModal && handleOpenModal({ ...item });
      }}
    >
      <div className='flex h-full flex-col'>
        <div
          className={`relative mb-1.5 aspect-productCard w-full overflow-hidden sm:mb-2`}
        >
          {item?.tags && (
            <div
              className={cn(
                'group/tags absolute left-0 top-0 z-[1] flex h-fit w-fit flex-wrap max-md:p-2 md:ml-3 md:mt-3',
              )}
            >
              {item?.tags?.map((tagID, key) => {
                const tag = catalog?.tagsInfo?.[Number(tagID)];

                return (
                  <TagPlate
                    key={key}
                    indx={key}
                    plateId={item.id}
                    platePrice={Number(item?.values?.[0]?.price ?? 0)}
                    tag={tag}
                  />
                );
              })}
            </div>
          )}

          {item?.thumbnailPicture ? (
            <Image
              ref={imageRef}
              src={
                item.thumbnailPicture +
                `&width=${(imageRef.current?.clientWidth ?? 0) + 200}&height=${(imageRef.current?.clientHeight ?? 0) + 200}`
              }
              className='absolute inset-0 max-h-full max-w-full bg-black/5 object-cover transition-transform duration-1000 group-hover:scale-110'
              fill
              placeholder='blur'
              blurDataURL={item.thumbnailPicture}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              alt='Picture of the author'
            />
          ) : (
            <NotCatalogImg className='absolute inset-0 h-full w-full max-w-full object-cover' />
          )}
        </div>
        <div className={`flex flex-col  justify-between p-2 sm:px-3`}>
          <div className='flex flex-col'>
            <div className='flex items-start justify-between gap-2 max-md:items-start sm:mb-3'>
              <Typography
                variant='desc'
                className='line-clamp-2 !text-sm text-primary group-hover:text-main sm:!text-lg sm:font-semibold'
              >
                {item?.sizes?.[Number(selectedSize)]?.name ?? item?.name}
              </Typography>
              {(item?.sizes?.[Number(selectedSize)]?.mass ?? item?.values?.[0]?.mass) && (
                <Typography
                  variant='desc'
                  className='hidden whitespace-nowrap rounded-full border-2 border-lightGray px-[11px] py-1 !text-sm font-normal text-secondary sm:block'
                >
                  {item?.sizes?.[Number(selectedSize)]?.mass ?? item?.values?.[0]?.mass}
                </Typography>
              )}
            </div>
            {item?.sizes?.length <= 1 &&
              (item?.sizes?.[Number(selectedSize)]?.composition ?? item?.composition) && (
                <Typography
                  variant='desc'
                  className='!line-clamp-2 !overflow-hidden !text-ellipsis !text-sm text-secondary max-md:!hidden'
                >
                  {item?.sizes?.[Number(selectedSize)]?.composition ?? item?.composition}
                </Typography>
              )}
          </div>
        </div>
      </div>
      {item?.sizes?.length > 1 && (
        <div
          className='mb-[14px] px-3 max-md:hidden'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {item?.useSizesDropdown === '0' ? (
            <Tabs
              defaultValue='0'
              value={selectedSize}
              onValueChange={(val) => {
                setSelectedSize(val);
              }}
            >
              <TabsList className='h-[34px]'>
                {item?.sizes?.map((size, key) => {
                  return (
                    <TabsTrigger
                      className='h-[28px] text-xs'
                      key={key}
                      value={key?.toString()}
                    >
                      {size?.size}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          ) : (
            <div>
              <SizesSelect
                options={tabsSizeList}
                active={
                  tabsSizeList.find(
                    (tab) => Number(tab.value) === Number(selectedSize),
                  ) ?? tabsSizeList[0]
                }
                setActive={(val) => {
                  setSelectedSize(val.value);
                }}
              />
            </div>
          )}
        </div>
      )}
      <div className='mb-3 flex justify-between px-2 pb-3 max-sm:mb-0 max-sm:flex-col sm:mb-0 sm:min-h-[66px] sm:w-full sm:items-center sm:px-3 sm:pb-[18px]'>
        {price ? (
          <Typography
            variant='desc'
            className='!text-sm !font-semibold text-primary sm:!text-xl'
          >
            {price}
          </Typography>
        ) : (
          <div className='flex flex-wrap items-center gap-x-2'>
            <Typography
              variant='desc'
              className={cn(
                'text-base font-semibold text-primary md:text-lg',
                (orders?.find(
                  (i) => i.id === item?.id && (!i.modifiers || i.modifiers?.length === 0),
                )?.countInCart ?? 0) > 0 && '!text-main',
              )}
            >
              {item?.sizes?.length > 1
                ? priceFormatter(item?.sizes?.[Number(selectedSize)]?.price)
                : priceFormatter(item?.price ?? item.values[0]?.price)}
            </Typography>
            {item?.sizes?.length > 1
              ? (Number(item?.sizes?.[Number(selectedSize)]?.salePrice) ?? 0) > 0 && (
                  <Typography
                    variant='desc'
                    className='text-sm text-secondary line-through max-sm:text-xs'
                  >
                    {priceFormatter(item?.sizes?.[Number(selectedSize)]?.salePrice)}
                  </Typography>
                )
              : Number(item.values[0]?.salePrice ?? 0) > 0 && (
                  <Typography
                    variant='desc'
                    className='text-sm text-secondary line-through max-sm:text-xs'
                  >
                    {priceFormatter(item.values[0]?.salePrice)}
                  </Typography>
                )}
          </div>
        )}

        <div
          className='flex w-full items-center justify-between sm:w-fit'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {(orders?.find(
            (i) => i.id === item?.id && (!i.modifiers || i.modifiers?.length === 0),
          )?.countInCart ?? 0) > 0 ? (
            <div className='w-full'>
              <Counter
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                value={orders.find((i) => i.id === item?.id)?.countInCart ?? 0}
                minValue={0}
                maxValue={item.maxCount}
                callBack={countHandler}
                className={
                  'mx-auto !h-9 min-w-full px-2 max-sm:mt-1.5 md:!h-10 md:!w-[120px]'
                }
                classNameText='!font-semibold !text-base'
              />
            </div>
          ) : (
            <>
              <Typography
                variant='desc'
                className='whitespace-nowrap !text-xs text-secondary sm:hidden'
              >
                {item?.values[0]?.mass}
              </Typography>
              <PlusButton className={'sm:hidden'} onClick={addPlateHandler} />
              <Button
                variant={'outline'}
                size={'sm'}
                className='hidden h-[40px] w-[120px]  hover:border-opacity-0 group-hover:bg-main  group-hover:text-white sm:block'
                onClick={item?.sizes?.length <= 1 ? addPlateHandler : addPlateWithSizes}
              >
                Выбрать
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
