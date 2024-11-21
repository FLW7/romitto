import { useState } from 'react';

import { ModifierCardPure } from './modifier-card-pure';

import type { SelectedModifiersType, TBundle, TModifier } from '@/feature/detail-meal';
import { ModifierCard } from '@/feature/detail-meal/el/modifier-card';
import { cn } from '@/shared/lib/utils';
interface Props {
  items: TBundle;
  counts: number;
  handleModifierSelect: (bundle: TBundle, modifier: TModifier) => void;
  handleModifierCount: (value: number, item: TModifier, bundleID: number) => void;
  selectedModifiers: SelectedModifiersType;
}
export const ModLists = ({
  items,
  counts,
  handleModifierSelect,
  handleModifierCount,
  selectedModifiers,
}: Props) => {
  const [showAllModifiers, setShowAllModifiers] = useState(false);

  const somePicture: boolean = items.modifiers.some((item) => !!item.pictureUrl);

  return (
    <div className={'border-b border-black/10 last:border-none'}>
      <div
        className={cn(
          items.modifiers.some((item) => !!item.pictureUrl)
            ? 'grid grid-cols-3 gap-2'
            : 'flex flex-col gap-y-2',
          'mt-3',
        )}
      >
        {somePicture
          ? items?.modifiers?.map((item) => (
              <ModifierCard
                key={item.id}
                item={item}
                counts={counts}
                id={items.id}
                bundle={items}
                handleModifierSelect={handleModifierSelect}
                handleModifierCount={handleModifierCount}
                selectedModifiers={selectedModifiers}
              />
            ))
          : items?.modifiers?.map((item, key) => {
              return (
                (showAllModifiers || key <= 3) && (
                  <ModifierCardPure
                    key={item.id}
                    item={item}
                    counts={counts}
                    id={items.id}
                    bundle={items}
                    handleModifierSelect={handleModifierSelect}
                    handleModifierCount={handleModifierCount}
                    selectedModifiers={selectedModifiers}
                  />
                )
              );
            })}
      </div>
      {!somePicture && items?.modifiers?.length > 4 && (
        <div
          className={`mt-2 flex w-fit cursor-pointer !text-sm text-main`}
          onClick={() => {
            setShowAllModifiers(!showAllModifiers);
          }}
        >
          {showAllModifiers ? 'Скрыть' : 'Смотреть все'}
        </div>
      )}
    </div>
  );
};
