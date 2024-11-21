import * as React from 'react';

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  max: number;
}
export const ControllersStories = ({ setActiveIndex }: Props) => {
  return (
    <div className={'absolute z-20 grid h-full w-full grid-cols-2'}>
      <button
        className={'h-full outline-none'}
        onClick={() => {
          setActiveIndex((prev) => {
            return prev === 0 ? prev : prev - 1;
          });
        }}
      ></button>
      <button
        className={'h-full outline-none'}
        onClick={() => {
          setActiveIndex((prev) => prev + 1);
        }}
      ></button>
    </div>
  );
};
