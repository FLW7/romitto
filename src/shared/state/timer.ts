import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ITimerStore {
  seconds: number;

  setSeconds: (value: number) => void;
}

const initData = {
  seconds: 30,
};

export const useTimerStore = create<ITimerStore>()(
  devtools(
    persist(
      (set) => ({
        seconds: initData.seconds,
        setSeconds: (value) => {
          set({ seconds: value });
        },
      }),
      { name: 'timerStore' },
    ),
  ),
);
