/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useEffect, useState } from 'react';

import Image from 'next/image';

import ModCheckedIcon from '@/assets/icons/mod-checked.svg';
import Counter from '@/entities/counter/counter';
import type { SelectedModifiersType, TBundle, TModifier } from '@/feature/detail-meal';
import Typography from '@/shared/components/typography';
import { imageLib } from '@/shared/lib/image';
import { priceFormatter } from '@/shared/lib/price';
import { cn } from '@/shared/lib/utils';

interface Props {
  id: number;
  item: TModifier;
  bundle: TBundle;
  handleModifierSelect: (
    bundle: TBundle,
    modifier: TModifier,
    setDefault?: boolean,
  ) => void;
  handleModifierCount: (value: number, item: TModifier, bundleID: number) => void;
  selectedModifiers: SelectedModifiersType;
  counts: number;
}

export const ModifierCard = ({
  id,
  counts,
  item,
  bundle,
  handleModifierSelect,
  handleModifierCount,
  selectedModifiers,
}: Props) => {
  const [amount, setAmount] = useState<number>(1);
  const handleAddModifier = () => {
    handleModifierSelect(bundle, { ...item, count: 1 });

    setAmount(1);
  };

  useEffect(() => {
    if (Number(item?.defaultAmount) > 0) {
      handleModifierSelect(bundle, { ...item, count: Number(item.defaultAmount) }, true);

      setAmount(Number(item.defaultAmount));
    }
  }, [item.defaultAmount]);

  const handleCount = (value: number) => {
    setAmount(value);
    handleModifierCount(value, item, bundle.id);
  };

  const checked = selectedModifiers
    ?.find((mod) => id === mod.id)
    ?.items.some((el) => el.id === item.id);

  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-xl bg-white shadow-modsShadow',
        checked ? 'border border-main' : 'cursor-pointer',
      )}
      onClick={() => {
        checked
          ? Number(item.maxAmount) === 1 && handleCount(0)
          : Number(counts) < Number(bundle.maxAmount) && handleAddModifier();
      }}
    >
      {checked && Number(item.maxAmount) === 1 && (
        <ModCheckedIcon className={'absolute right-2 top-2 h-6 w-6'} />
      )}
      <Image
        src={imageLib(item.pictureUrl)}
        alt={item.name}
        width={132}
        height={132}
        className={'aspect-square h-full w-full object-cover'}
      />
      <div className='flex h-full flex-col justify-between p-2 pt-1'>
        <Typography
          variant={'desc'}
          className={cn(
            'line-clamp-2 overflow-hidden text-ellipsis !text-xs !font-semibold !leading-4',
          )}
        >
          {item.name}
        </Typography>

        <div className={'mt-4 flex items-center justify-between'}>
          {!checked || Number(item.maxAmount) === 1 ? (
            <Typography
              variant={'p2'}
              className={'!text-sm !font-semibold !leading-[24px]'}
            >
              {priceFormatter(item.price)}
            </Typography>
          ) : (
            <Counter
              value={amount}
              callBack={handleCount}
              minValue={Number(item.minAmount)}
              className='max-h-6 w-full max-w-full'
              classNameText='!text-xs !font-semibold !leading-[140%]'
              maxValue={
                Number(counts) >= Number(bundle.maxAmount)
                  ? 0
                  : Number(item.maxAmount) || undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
