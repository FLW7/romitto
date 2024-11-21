import { useEffect } from 'react';

import { useIntervalWhen } from 'rooks';

import { useTimerStore } from '@/shared/state/timer';

export const useTimer = () => {
  const { seconds, setSeconds } = useTimerStore();

  useIntervalWhen(
    () => {
      setSeconds(seconds - 1);
    },
    1000,
    seconds > 0,
  );

  useEffect(() => {
    setSeconds(!seconds || seconds === 0 ? 0 : seconds);
  }, []);

  return {
    seconds,
    setSeconds,
  };
};
