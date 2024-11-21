import {
  type SelectedModifiersType,
  type TBundle,
  type TModifier,
} from '@/feature/detail-meal';
import { ModLists } from '@/feature/detail-meal/el/mod-lists';
import Typography from '@/shared/components/typography';
interface Props {
  i: TBundle;
  counts: number;
  requiredModError?: boolean;
  handleModifierSelect: (bundle: TBundle, modifier: TModifier) => void;
  handleModifierCount: (value: number, item: TModifier, bundleID: number) => void;
  selectedModifiers: SelectedModifiersType;
  requiredModIds: Array<{ id: number; min: number }>;
}
export const Modifier = ({
  i,
  counts,
  handleModifierSelect,
  handleModifierCount,
  requiredModError,
  selectedModifiers,
  requiredModIds,
}: Props) => {
  return (
    <div className='px-4'>
      {/* {Number(i?.minAmount) > 0 && <TooltipCustom id='modifier-tooltip' offset={10} />} */}
      <div
        className='flex items-center gap-2'
        data-tooltip-id={'modifier-tooltip'}
        data-tooltip-html={Number(i?.minAmount) > 0 ? 'Обязательно к выбору' : ''}
      >
        <Typography
          variant={'p'}
          className={`!text-base !font-semibold ${requiredModIds.some((el) => Number(el.id) === Number(i.id)) && requiredModError ? '!text-main' : '!text-primary'}`}
        >
          {i.title}
          <Typography
            variant={'desc'}
            className='ml-1 mt-[5px] inline whitespace-nowrap !text-xs font-semibold !text-secondary'
          >
            {i.type.toString() === '1'
              ? // eslint-disable-next-line unicorn/explicit-length-check
                `(${i.maxAmount || i.modifiers.length} на выбор)`
              : '(1 на выбор)'}
          </Typography>
        </Typography>
      </div>
      <ModLists
        items={i}
        counts={counts}
        handleModifierSelect={handleModifierSelect}
        handleModifierCount={handleModifierCount}
        selectedModifiers={selectedModifiers}
      />
    </div>
  );
};
