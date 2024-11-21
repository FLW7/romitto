import * as React from 'react';

import { Button } from '@/shared/components/button';
import { type StepFormType } from '@/shared/state/delivery';
interface Props {
  step?: StepFormType;
}
export const FixedFooter = ({ step }: Props) => {
  const handleClick = () => {
    if (!step) return;
    const button = document.querySelector(`#${step}Button`) as HTMLButtonElement;

    button && button?.click();
  };

  return (
    <div className={'center fixed bottom-0 w-full gap-2 bg-white px-4 py-2 sm:hidden'}>
      <Button className={'w-full'} onClick={handleClick}>
        Выбрать
      </Button>
    </div>
  );
};
