import { useEffect, useRef, useState, type MouseEvent } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, useAnimation } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type z } from 'zod';

import { Macronutrients } from './el/macronutrients';
import SizesSelect from './el/sizes-select';
import Stats from './el/stats';

import CartIcon from '@/assets/icons/detail-meal/cart.svg';
import HeartRounded from '@/assets/icons/heart-rounded.svg';
import NotCatalogImg from '@/assets/icons/not-catalog-img.svg';
import TagPlate from '@/entities/tag-plate';
import { Modifier } from '@/feature/detail-meal/el/modifier';
import { Recomendations } from '@/feature/detail-meal/el/recomendations';
import { setFavourite } from '@/shared/api/set-favourite';
import { Button } from '@/shared/components/button';
import { type Tab, Tabs } from '@/shared/components/tabs-animate';
import Typography from '@/shared/components/typography';
import { useToast } from '@/shared/components/use-toast';
import { QUERY_KEY } from '@/shared/const/query-key';
import { useGetCatalog } from '@/shared/hooks/query/use-get-catalog';
import { useGetFavourites } from '@/shared/hooks/query/use-get-favourites';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { findOrder } from '@/shared/lib/find-order';
import { priceFormatter } from '@/shared/lib/price';
import { cn } from '@/shared/lib/utils';
import { useAddress } from '@/shared/state/address';
import { useAuth } from '@/shared/state/auth';
import { useModal } from '@/shared/state/modal';
import {
  type ICartOrderItem,
  type schemaPlateModificator,
  type schemaPlateModificatorModifer,
} from '@/widgets/cart-widget/config';
import { useCart, useCartOpen } from '@/widgets/cart-widget/state';
export type TModifier = z.infer<typeof schemaPlateModificatorModifer>;
export type TBundle = z.infer<typeof schemaPlateModificator>;
const animationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export type SelectedModifiersType = Array<{
  id: number;
  title: string;
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  freeAmount: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    minAmount: number;
    maxAmount: number;
    defaultAmount: number;
    freeAmount: number;
    count?: number;
  }>;
  counts?: number;
}>;
export const DetailMeal = () => {
  const { onOpen, data: selectedItem, isOpen, onClose } = useModal();
  const { isAuth } = useAuth();
  const { toast } = useToast();
  const { addPlate, changePlateCount, deletePlate } = useCart();
  const { address } = useAddress();
  const { data: catalog } = useGetCatalog();
  const cartOpen = useCartOpen();
  const lgScreen = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();
  const { data } = useGetFavourites();
  const { mutateAsync } = useMutation({ mutationFn: setFavourite });
  const client = useQueryClient();

  const plateItem = selectedItem as ICartOrderItem;

  const isLastAddress = !!address?.LastAddressID || !!address?.LastAddressOrgID;

  const requiredModIds = plateItem?.modifierBundles
    ? plateItem.modifierBundles
        ?.filter((bundle: TBundle) => Number(bundle.minAmount) > 0)
        ?.map((item: TBundle) => ({ id: Number(item.id), min: Number(item.minAmount) }))
    : [];

  const tabsSizeList: Tab[] = plateItem?.sizes?.map((item) => ({
    title: item.size,
    value: plateItem?.sizes?.findIndex((el) => el.id === item.id).toString(),
  }));
  const tabsMassList: Tab[] = plateItem?.values?.map((item) => ({
    title: item.mass,
    value: plateItem?.values
      ?.findIndex((el) => Number(el.id) === Number(item.id))
      .toString(),
  }));

  const [count, setCount] = useState(1);
  const [selectedMass, setSelectedMass] = useState('0');
  const [selectedSize, setSelectedSize] = useState('0');
  const [totalPrice, setTotalPrice] = useState<any>(
    plateItem?.values?.[Number(selectedMass)]?.price,
  );
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifiersType>([]);
  const [requiredModError, setRequiredError] = useState<boolean>(false);
  const [itemCount, setItemCount] = useState(0);
  const { orders } = useCart();

  const handleTabMassChange = (value: any) => {
    setSelectedMass(value.value);
    calculatePrice();
  };

  const handleTabSizeChange = (value: any) => {
    setSelectedSize(value.value);
    setSelectedModifiers([]);
    onOpen('detailMeal', {
      ...plateItem,
      ...plateItem.sizes[value.value],
      price: Number(plateItem.sizes[value.value].price),
      id: Number(plateItem.sizes[value.value].plateID),
    });
  };

  const handleModifierSelect = (bundle: TBundle, modifier: TModifier) => {
    const currBundleIndex = selectedModifiers?.findIndex((item) => item.id === bundle.id);
    let currItems = selectedModifiers[currBundleIndex]?.items ?? [];

    const modifierIndex = currItems.findIndex((item) => item.id === modifier.id);

    if (Number(bundle.maxAmount) === 1) {
      if (modifierIndex === -1) {
        currItems = [
          {
            id: modifier.id,
            name: modifier.name,
            price: modifier.price,
            minAmount: Number(modifier.minAmount),
            maxAmount: Number(modifier.maxAmount),
            defaultAmount: Number(modifier.defaultAmount),
            freeAmount: Number(modifier.freeAmount),
            count: Number(modifier.count ?? 1),
          },
        ];
      } else if (Number(bundle.minAmount) === 0) {
        currItems.splice(modifierIndex, 1);
      }
    } else {
      if (modifierIndex === -1) {
        currItems.push({
          id: modifier.id,
          name: modifier.name,
          price: modifier.price,
          minAmount: Number(modifier.minAmount),
          maxAmount: Number(modifier.maxAmount),
          defaultAmount: Number(modifier.defaultAmount),
          freeAmount: Number(modifier.freeAmount),
          count: Number(modifier.count ?? 1),
        });
      } else {
        currItems.splice(modifierIndex, 1);
      }
    }

    const selected = [...selectedModifiers];

    const alreadyIndex = selected.findIndex((item) => item.id === bundle.id);

    if (alreadyIndex === -1) {
      selected.push({
        id: bundle.id,
        title: bundle.title,
        freeAmount: Number(bundle.freeAmount),
        minAmount: Number(bundle.minAmount),
        maxAmount: Number(bundle.maxAmount),
        defaultAmount: Number(bundle.defaultAmount),
        items: currItems,
        counts: currItems.reduce((acc, cur) => acc + (cur.count ?? 1), 0),
      });
    } else {
      selected[alreadyIndex].items = currItems;
      selected[alreadyIndex].counts = currItems.reduce(
        (acc, cur) => acc + (cur.count ?? 1),
        0,
      );
    }

    selected[alreadyIndex]?.items?.length === 0 && selected.splice(alreadyIndex, 1);

    setSelectedModifiers(selected);
  };

  const handleModifierCount = (value: number, item: TModifier, bundleID: number) => {
    const selected = [...selectedModifiers] as SelectedModifiersType;

    const currBundleIndex = selected.findIndex(
      (el) => Number(bundleID) === Number(el.id),
    );

    const currModIndex = selected[currBundleIndex].items.findIndex(
      (el) => Number(item.id) === Number(el.id),
    );

    if (value > 0) {
      selected[currBundleIndex].items[currModIndex].count = value;
      selected[currBundleIndex].counts = selected[currBundleIndex].items.reduce(
        (acc, cur) => acc + (cur.count ?? 1),
        0,
      );
    } else {
      selected[currBundleIndex].counts = (selected?.[currBundleIndex]?.counts ?? 1) - 1;
      selected[currBundleIndex].items.splice(currModIndex, 1);
      selected[currBundleIndex]?.items?.length === 0 &&
        selected.splice(currBundleIndex, 1);
    }
    setSelectedModifiers(selected);
  };

  const favouriteHandler = async (e: MouseEvent) => {
    e.stopPropagation();
    await mutateAsync({
      id: selectedItem?.id,
      type: data?.plates?.some((plate) => Number(plate?.id) === Number(selectedItem?.id))
        ? 'delete'
        : 'add',
    }).then(async () => {
      await client.invalidateQueries({ queryKey: QUERY_KEY.favourites });
    });
  };

  const calculatePrice = () => {
    const modifiers = selectedModifiers.flatMap((item) => item.items);
    let modsSale = 0;

    if (selectedModifiers) {
      for (const item of selectedModifiers) {
        if (item.freeAmount > 0) {
          let tmpSale = 0;
          let freeLimit = item.freeAmount;

          for (let index = 0; freeLimit > 0 && index < item.items.length; index++) {
            if ((item.items[index]?.count ?? 1) <= freeLimit) {
              tmpSale +=
                Number(item.items[index]?.price) * Number(item.items[index]?.count ?? 1);

              freeLimit = freeLimit - (item.items[index]?.count ?? 1);
            } else {
              tmpSale += Number(item.items[index]?.price) * freeLimit;
              freeLimit = 0;
            }
          }

          modsSale += tmpSale;
        }
      }
    }

    const modsPrice = modifiers.reduce(
      (curr, acc) => Number(curr) + Number(acc.price) * (acc.count ?? 1),
      0,
    );

    setTotalPrice(
      (Number(
        plateItem?.sizes?.[Number(selectedSize ?? 0)]?.price ??
          plateItem?.values?.[Number(selectedMass ?? 0)]?.price,
      ) +
        Number(modsPrice - modsSale)) *
        count,
    );
  };

  const handleAddToBasket = () => {
    if (isLastAddress) {
      const allRequiredModsExist = requiredModIds.every((item) =>
        selectedModifiers?.some(
          (bundle) =>
            Number(bundle.id) === Number(item.id) &&
            Number(bundle.counts) >= Number(item.min),
        ),
      );

      if (allRequiredModsExist) {
        let newItem: ICartOrderItem | null = null;

        newItem =
          selectedModifiers.length > 0
            ? {
                ...selectedItem,
                id: Number(selectedItem.id),
                modifiers: selectedModifiers,
                countInCart: count,
                price: totalPrice / count,
                values: [selectedItem.values[selectedMass]],
              }
            : {
                ...selectedItem,
                id: Number(selectedItem.id),
                countInCart: count,
                price: totalPrice / count,
                values: [selectedItem.values[selectedMass]],
              };

        if (newItem) {
          addPlate(newItem);
          toast({
            title: `Вы добавили "${plateItem?.name}" в свою корзину.`,
            description: (
              <Button
                variant={'link'}
                className='mt-2 p-0'
                onClick={() => {
                  lgScreen ? router.push('/cart') : cartOpen.onOpen();
                  onClose();
                }}
              >
                Просмотр корзины
              </Button>
            ),
            variant: 'success',
          });
          // onClose();
          setRequiredError(false);
        }
      } else {
        setRequiredError(true);
        if (plateItem?.descriptionModificator) {
          toast({
            title: plateItem?.descriptionModificator,
          });
        } else {
          toast({
            title: `Выберите модификатор`,
          });
        }
      }
    } else {
      const allRequiredModsExist = requiredModIds.every((item) =>
        selectedModifiers?.some(
          (bundle) =>
            Number(bundle.id) === Number(item.id) &&
            Number(bundle.counts) >= Number(item.min),
        ),
      );

      let newItem: ICartOrderItem | null = null;

      newItem =
        selectedModifiers.length > 0
          ? {
              ...selectedItem,
              id: Number(selectedItem.id),
              modifiers: selectedModifiers,
              countInCart: count,
              price: totalPrice / count,
              values: [selectedItem.values[selectedMass]],
            }
          : {
              ...selectedItem,
              id: Number(selectedItem.id),
              countInCart: count,
              price: totalPrice / count,
              values: [selectedItem.values[selectedMass]],
            };

      if (newItem && allRequiredModsExist) {
        onOpen('addressNotSpecified', { addPlate: newItem });
      } else {
        onOpen('addressNotSpecified');
      }
    }
  };

  useEffect(() => {
    setLoaded(false);
    setSelectedMass(tabsMassList?.[0].value);
    if (plateItem?.sizes?.length > 1) {
      const defaultSize = plateItem?.sizes?.findIndex(
        (el) => el?.plateID === plateItem?.values?.[0]?.id,
      );

      setSelectedSize(String(defaultSize >= 0 ? defaultSize : 0));
    }

    return () => {
      setCount(1);
      setSelectedModifiers([]);
    };
  }, [selectedItem?.sizes?.[0]?.plateID, isOpen]);

  useEffect(() => {
    calculatePrice();
  }, [selectedMass, selectedModifiers, count, plateItem]);

  useEffect(() => {
    const item = findOrder(
      plateItem?.id,
      orders,
      selectedModifiers,
      plateItem?.values?.[0].mass,
    );

    if (item?.countInCart) {
      setItemCount(item.countInCart);
    } else {
      setItemCount(0);
    }
  }, [plateItem, selectedModifiers, selectedSize, orders]);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const animationControls = useAnimation();

  useEffect(() => {
    if (loaded) {
      void animationControls.start('visible');
    }
  }, [loaded]);

  return (
    <div
      title={plateItem.name}
      aria-description={plateItem.composition}
      content={plateItem.composition}
      className={
        'flex h-full flex-auto flex-col overflow-y-auto bg-cartBg md:rounded-3xl'
      }
    >
      {isAuth && (
        <button
          className={'absolute right-[10px] top-[7px] z-[1] outline-none max-md:hidden'}
          onClick={favouriteHandler}
        >
          <HeartRounded
            width={57}
            height={57}
            className={`${data?.plates.some((plate) => Number(plate?.id) === Number(selectedItem?.id)) ? '!fill-main' : '!fill-secondary'} `}
          />
        </button>
      )}
      <div className={'md:flex md:overflow-hidden'}>
        <div className='relative min-h-[375px] min-w-[65%]'>
          {!loaded && plateItem?.pictures?.[0] && (
            <div className='absolute left-0 h-full min-h-[375px] w-full min-w-[65%] animate-shimmer rounded-3xl bg-gradient-to-r from-black/0 via-primary/10 bg-[length:400%_100%]'></div>
          )}
          {plateItem?.pictures?.[0] ? (
            <motion.div
              initial={'hidden'}
              animate={animationControls}
              variants={animationVariants}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              className='relative aspect-square min-w-[65%]'
            >
              {plateItem?.tags && (
                <div
                  className={cn(
                    'group/tags absolute left-0 top-0 z-[5] flex h-fit w-fit flex-wrap max-md:p-2 md:ml-3 md:mt-3',
                  )}
                >
                  {plateItem?.tags?.map((tagID, key) => {
                    const tag = catalog?.tagsInfo?.[Number(tagID)];

                    return (
                      <TagPlate
                        key={Number(tagID)}
                        plateId={plateItem.id + 111}
                        indx={key}
                        platePrice={Number(plateItem?.values?.[0]?.price ?? 0)}
                        tag={tag}
                      />
                    );
                  })}
                </div>
              )}
              <Image
                ref={imageRef}
                src={
                  plateItem?.pictures?.[0] +
                  `&width=${(imageRef.current?.clientWidth ?? 0) + 200}&height=${(imageRef.current?.clientHeight ?? 0) + 200}`
                }
                alt={plateItem?.name}
                width={620}
                height={620}
                quality={100}
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className={`aspect-square h-full w-full object-cover`}
                onLoadingComplete={() => {
                  setLoaded(true);
                }}
              />
            </motion.div>
          ) : (
            <NotCatalogImg
              className={`aspect-square h-full w-full min-w-[65%] object-cover`}
            />
          )}
        </div>
        <div
          className={
            'scrollbar-thin relative -mt-5 w-full overflow-x-hidden max-md:bg-bgDark md:mt-0 md:max-h-[656px] md:overflow-y-auto'
          }
        >
          <div className='flex flex-col gap-[6px] bg-cartBg pb-[6px] max-md:pb-[82px] md:mx-2 md:mt-2 md:min-h-[calc(100%-90px)]'>
            <div className='rounded-xl bg-bgMain px-4 py-[18px]'>
              <div className='mb-3'>
                <Typography
                  variant={'h1'}
                  className={`truncate whitespace-normal pb-2 text-left font-semibold sm:pt-[17px]`}
                >
                  {plateItem?.name}
                </Typography>
                <Typography
                  variant={'p2'}
                  className={`!text-sm font-semibold text-secondary`}
                >
                  {plateItem?.values?.[0]?.mass}
                </Typography>
                <Typography variant={'p'} className='mt-2 !text-sm !font-normal'>
                  {plateItem?.composition}
                </Typography>
              </div>

              {(plateItem?.sizes?.length > 1 || plateItem?.values?.length > 1) && (
                <div className='flex flex-col'>
                  {plateItem?.sizes?.length > 1 &&
                    (plateItem?.useSizesDropdown === '0' ? (
                      <Tabs
                        tabs={tabsSizeList}
                        active={tabsSizeList?.[Number(selectedSize ?? 0)]}
                        setActive={handleTabSizeChange}
                      />
                    ) : (
                      <div className='z-52'>
                        <SizesSelect
                          options={tabsSizeList}
                          active={
                            tabsSizeList.find(
                              (tab) => Number(tab.value) === Number(selectedSize),
                            ) ?? tabsSizeList[0]
                          }
                          setActive={handleTabSizeChange}
                        />
                      </div>
                    ))}

                  {plateItem?.values?.length > 1 && (
                    <Tabs
                      tabs={tabsMassList}
                      active={
                        tabsMassList.find(
                          (tab) => Number(tab.value) === Number(selectedMass),
                        ) ?? tabsMassList?.[0]
                      }
                      setActive={handleTabMassChange}
                    />
                  )}
                </div>
              )}
            </div>

            {!!plateItem?.modifierBundles?.length && (
              <div className='flex flex-col gap-[6px]'>
                {plateItem?.modifierBundles?.map((i: TBundle) => {
                  const bundleIndex = selectedModifiers.findIndex(
                    (item) => item.id === i.id,
                  );
                  const counts = selectedModifiers[bundleIndex]?.counts;

                  return (
                    <div key={i.id} className='rounded-xl bg-bgMain py-[18px]'>
                      <Modifier
                        i={i}
                        counts={counts ?? 0}
                        handleModifierSelect={handleModifierSelect}
                        handleModifierCount={handleModifierCount}
                        selectedModifiers={selectedModifiers}
                        requiredModError={requiredModError}
                        requiredModIds={requiredModIds}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <Macronutrients {...plateItem} />
            <Stats plateItem={plateItem} />
            <Recomendations {...selectedItem} />
          </div>
          <div className='sticky bottom-[0] left-0 z-20 flex rounded-t-3xl bg-bgMain px-4 max-md:fixed max-md:w-full max-md:pb-[22px] max-md:pt-[10px] md:mx-2 md:h-[90px]'>
            <div className={'flex grow items-center gap-3'}>
              {/* <Counter
                callBack={setCount}
                value={count}
                minValue={1}
                className='min-h-[44px] min-w-[40%] md:min-w-[150px]'
              /> */}
              {itemCount > 0 ? (
                <div className='flex w-full items-center gap-2'>
                  <div
                    className={`flex h-[44px] w-full items-center justify-between rounded-full bg-main`}
                  >
                    <Button
                      variant={'destructive'}
                      size={'destructive'}
                      className='pl-8'
                      onClick={() => {
                        itemCount > 1
                          ? changePlateCount(
                              plateItem.id,
                              itemCount - 1,
                              selectedModifiers,
                              plateItem.values[Number(selectedMass ?? 0)].mass,
                            )
                          : deletePlate(
                              plateItem.id,
                              selectedModifiers,
                              plateItem.values[Number(selectedMass ?? 0)].mass,
                            );
                      }}
                    >
                      <Minus color='white' />
                    </Button>
                    <Typography variant={'p'} className={'whitespace-nowrap text-white'}>
                      {itemCount} x {priceFormatter(totalPrice)}
                    </Typography>
                    <Button variant={'destructive'} size={'destructive'} className='pr-8'>
                      <Plus
                        color='white'
                        onClick={() => {
                          changePlateCount(
                            plateItem.id,
                            itemCount + 1,
                            selectedModifiers,
                            plateItem.values[Number(selectedMass ?? 0)].mass,
                          );
                        }}
                      />
                    </Button>
                  </div>
                  <CartIcon
                    className='h-[50px] w-[50px] min-w-[50px] cursor-pointer'
                    onClick={() => {
                      lgScreen ? router.push('/cart') : cartOpen.onOpen();
                      onClose();
                    }}
                  />
                </div>
              ) : (
                <Button
                  className={`h-[44px] w-full md:px-12`}
                  onClick={handleAddToBasket}
                >
                  <Typography
                    variant={'desc'}
                    className={
                      'flex items-center gap-3 text-base font-semibold text-white'
                    }
                  >
                    <Plus size={20} />
                    Добавить за {priceFormatter(totalPrice)}
                  </Typography>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
