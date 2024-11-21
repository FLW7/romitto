/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useEffect, useState } from 'react';

import CounterMod from '@/entities/counter-mod/counter-mod';
import type { SelectedModifiersType, TBundle, TModifier } from '@/feature/detail-meal';
import PlusButtonMod from '@/shared/components/plus-button-mod';
import Typography from '@/shared/components/typography';
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

export const ModifierCardPure = ({
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

  const handleCount = (value: number) => {
    setAmount(value);
    handleModifierCount(value, item, bundle.id);
  };

  useEffect(() => {
    if (Number(item?.defaultAmount) > 0) {
      handleModifierSelect(bundle, { ...item, count: Number(item.defaultAmount) }, true);

      setAmount(Number(item.defaultAmount));
    }
  }, [item.defaultAmount]);

  const checked = selectedModifiers
    ?.find((mod) => id === mod.id)
    ?.items.some((el) => el.id === item.id);

  return (
    <div className='flex items-end gap-0 sm:gap-[6px]'>
      <div className='flex items-end gap-1'>
        <Typography variant={'desc'} className='!leading-[140%]'>
          {item.name}
          {Number(item.price) > 0 && (
            <Typography
              variant={'desc'}
              className='ml-1 mt-1 inline whitespace-nowrap !text-sm !leading-[140%] text-secondary'
            >
              +{priceFormatter(item.price)}
            </Typography>
          )}
        </Typography>
      </div>

      {/* Элемент с пунктирной линией */}
      <div className='mr-1 h-[13px] flex-grow self-end border-b-[1px] border-dashed border-primary/20' />

      {!checked || Number(item.maxAmount) === 1 ? (
        <PlusButtonMod
          plusIcon
          onClick={handleAddModifier}
          className={cn(
            Number(counts) >= Number(bundle.maxAmount) &&
              Number(bundle.maxAmount) > 1 &&
              !checked &&
              'pointer-events-none opacity-50',
            'min-w-5',
          )}
          checked={checked}
        />
      ) : (
        <CounterMod
          value={amount}
          callBack={handleCount}
          minValue={Number(item.minAmount)}
          maxValue={
            Number(counts) >= Number(bundle.maxAmount)
              ? 0
              : Number(item.maxAmount) || undefined
          }
        />
      )}
    </div>
  );
};
