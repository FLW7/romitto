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
import { findOrder } from '@/shared/lib/find-order';
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
  const [itemCount, setItemCount] = useState(0);

  const plateItem = { ...item };

  const hasRequiredItem =
    plateItem.modifierBundles &&
    plateItem.modifierBundles.some((bundle) => Number(bundle.minAmount) > 0);

  const addPlateHandler = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const addPlateCond = (plate: ICartOrderItem) => {
      if (hasRequiredItem) {
        handleOpenModal(plate);
      } else {
        addPlate({ ...plate, price: Number(plate.values[0]?.price), countInCart: 1 });
        toast({
          title: `Вы добавили "${plate.name}" в свою корзину.`,
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
      addPlateCond(plateItem);
    } else if (hasRequiredItem) {
      onOpen('addressNotSpecified');
    } else {
      onOpen('addressNotSpecified', {
        addPlate: {
          ...plateItem,
          price: Number(plateItem.values[0]?.price),
          countInCart: 1,
        },
      });
    }
  };

  const addPlateWithSizes = () => {
    if (isLastAddress) {
      if (hasRequiredItem) {
        handleOpenModal(item);
      } else {
        addPlate({
          ...plateItem,
          ...plateItem.sizes[Number(selectedSize)],
          price: Number(plateItem.sizes[Number(selectedSize)].price),
          id: Number(plateItem.sizes[Number(selectedSize)].plateID),
          countInCart: 1,
        });
        toast({
          title: `Вы добавили "${plateItem.name}" в свою корзину.`,
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
      onOpen('addressNotSpecified', {
        addPlate: {
          ...plateItem,
          ...plateItem.sizes[Number(selectedSize)],
          price: Number(plateItem.sizes[Number(selectedSize)].price),
          id: Number(plateItem.sizes[Number(selectedSize)].plateID),
          countInCart: 1,
        },
      });
    }
  };

  const countHandler = (value: number) => {
    if (value === 0) {
      deletePlate(plateItem.id, undefined, item.values[0].mass);
    }

    changePlateCount(plateItem.id, value, undefined, plateItem.values[0].mass);
  };

  const tabsSizeList: Tab[] = plateItem?.sizes?.map((i) => ({
    title: i.size,
    value: plateItem?.sizes?.findIndex((el) => el.id === i.id).toString(),
  }));

  useEffect(() => {
    if (plateItem?.sizes?.length > 1) {
      const defaultSize = plateItem?.sizes?.findIndex(
        (el) => el?.plateID === plateItem?.values?.[0]?.id,
      );

      setSelectedSize(String(defaultSize >= 0 ? defaultSize : 0));
    }
  }, []);

  const { data: catalog } = useGetCatalog();
  let price: string | null = null;

  plateItem?.tags?.forEach((tagID) => {
    if (catalog?.tagsInfo?.[Number(tagID)]?.title?.includes('₽')) {
      price = catalog?.tagsInfo?.[Number(tagID)].title;
    }
  });

  useEffect(() => {
    plateItem.id = Number(plateItem?.sizes[Number(selectedSize ?? 0)]?.id);
  }, [selectedSize]);

  useEffect(() => {
    const el = findOrder(
      Number(plateItem?.id),
      orders,
      plateItem.modifiers,
      plateItem?.values?.[0].mass,
    );

    if (el?.countInCart) {
      setItemCount(el?.countInCart ?? 1);
    } else {
      setItemCount(0);
    }
  }, [orders]);

  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <div
      className={cn(
        className,
        'group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-bgSecondary shadow-productCart transition-all duration-500 max-[900px]:shadow-mobProductCart max-sm:h-full',
      )}
      onClick={() => {
        handleOpenModal && handleOpenModal({ ...plateItem });
      }}
    >
      <div className='flex h-full flex-col'>
        <div
          className={`relative mb-1.5 aspect-productCard w-full overflow-hidden sm:mb-2`}
        >
          {plateItem?.tags && (
            <div
              className={cn(
                'group/tags absolute left-0 top-0 z-[1] flex h-fit w-fit flex-wrap max-md:p-2 md:ml-3 md:mt-3',
              )}
            >
              {plateItem?.tags?.map((tagID, key) => {
                const tag = catalog?.tagsInfo?.[Number(tagID)];

                return (
                  <TagPlate
                    key={key}
                    indx={key}
                    plateId={plateItem.id}
                    platePrice={Number(plateItem?.values?.[0]?.price ?? 0)}
                    tag={tag}
                  />
                );
              })}
            </div>
          )}

          {plateItem?.thumbnailPicture ? (
            <Image
              ref={imageRef}
              src={
                plateItem.thumbnailPicture +
                `&width=${(imageRef.current?.clientWidth ?? 0) + 200}&height=${(imageRef.current?.clientHeight ?? 0) + 200}`
              }
              quality={100}
              className='absolute inset-0 max-h-full max-w-full bg-primary/5 object-cover transition-transform duration-1000 group-hover:scale-110'
              fill
              placeholder='blur'
              blurDataURL={plateItem.thumbnailPicture}
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
                {plateItem?.sizes?.[Number(selectedSize)]?.name ?? plateItem?.name}
              </Typography>
              {(plateItem?.sizes?.[Number(selectedSize)]?.mass ??
                plateItem?.values?.[0]?.mass) && (
                <Typography
                  variant='desc'
                  className='hidden whitespace-nowrap rounded-full border-2 border-primary/10 px-[11px] py-1 !text-sm font-normal text-secondary sm:block'
                >
                  {plateItem?.sizes?.[Number(selectedSize)]?.mass ??
                    plateItem?.values?.[0]?.mass}
                </Typography>
              )}
            </div>
            {plateItem?.sizes?.length <= 1 &&
              (plateItem?.sizes?.[Number(selectedSize)]?.composition ??
                plateItem?.composition) && (
                <Typography
                  variant='desc'
                  className='!line-clamp-2 !overflow-hidden !text-ellipsis !text-sm text-secondary max-md:!hidden'
                >
                  {plateItem?.sizes?.[Number(selectedSize)]?.composition ??
                    plateItem?.composition}
                </Typography>
              )}
          </div>
        </div>
      </div>
      {plateItem?.sizes?.length > 1 && (
        <div
          className='mb-[14px] px-3 max-md:hidden'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {plateItem?.useSizesDropdown === '0' ? (
            <Tabs
              defaultValue='0'
              value={selectedSize}
              onValueChange={(val) => {
                setSelectedSize(val);
              }}
            >
              <TabsList className='h-[34px] bg-counterBg'>
                {plateItem?.sizes?.map((size, key) => {
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
                  (i) =>
                    i.id === plateItem?.id && (!i.modifiers || i.modifiers?.length === 0),
                )?.countInCart ?? 0) > 0 && '!text-main',
              )}
            >
              {plateItem?.sizes?.length > 1
                ? priceFormatter(plateItem?.sizes?.[Number(selectedSize)]?.price)
                : priceFormatter(plateItem?.price ?? plateItem.values[0]?.price)}
            </Typography>
            {plateItem?.sizes?.length > 1
              ? (Number(plateItem?.sizes?.[Number(selectedSize)]?.salePrice) ?? 0) >
                  0 && (
                  <Typography
                    variant='desc'
                    className='text-sm text-secondary line-through max-sm:text-xs'
                  >
                    {priceFormatter(plateItem?.sizes?.[Number(selectedSize)]?.salePrice)}
                  </Typography>
                )
              : Number(plateItem.values[0]?.salePrice ?? 0) > 0 && (
                  <Typography
                    variant='desc'
                    className='text-sm text-secondary line-through max-sm:text-xs'
                  >
                    {priceFormatter(plateItem.values[0]?.salePrice)}
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
          {itemCount > 0 && plateItem?.sizes?.length <= 1 ? (
            <div className='w-full'>
              <Counter
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                value={itemCount ?? 1}
                minValue={0}
                maxValue={plateItem.maxCount}
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
                {plateItem?.values[0]?.mass}
              </Typography>
              <PlusButton className={'sm:hidden'} onClick={addPlateHandler} />
              <Button
                variant={'outline'}
                size={'sm'}
                className='hidden h-[40px] w-[120px] from-main  to-gradient hover:border-opacity-0 group-hover:border-none group-hover:bg-gradient-to-l group-hover:text-white sm:block'
                onClick={
                  plateItem?.sizes?.length <= 1 ? addPlateHandler : addPlateWithSizes
                }
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
