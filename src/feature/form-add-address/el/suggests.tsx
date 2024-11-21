import { forwardRef } from 'react';

import { type IPredictionItem } from '@/feature/form-add-address/type';
import Typography from '@/shared/components/typography';

interface SuggestsProps {
  suggests?: IPredictionItem[];
  onClick: (value: IPredictionItem) => void;
}

export const Suggests = forwardRef<HTMLDivElement, SuggestsProps>(
  ({ suggests, onClick }, ref) => {
    const isEmpty = !suggests?.length;

    if (isEmpty) return null;

    return (
      <div
        ref={ref}
        className={
          'absolute top-[68px] z-10 w-full  rounded-[12px] border-black/10 py-1 sm:border sm:bg-white sm:p-1 sm:shadow-xl'
        }
      >
        <ul className={'scrollbar-thin max-h-[400px] overflow-y-auto md:max-h-[274px]'}>
          {suggests?.map((el) => (
            <li
              onClick={() => {
                onClick(el);
              }}
              key={el.place_id}
              className={
                'cursor-pointer rounded-[12px] px-4 py-2 transition-colors hover:bg-black/5'
              }
            >
              <Typography variant={'p2'} className={'font-medium'}>
                {el.structured_formatting.secondary_text}
              </Typography>
              <Typography variant={'desc'} className={'text-xs text-secondary'}>
                {el.structured_formatting.main_text}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
