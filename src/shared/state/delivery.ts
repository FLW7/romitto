import { create } from 'zustand';

export type StepFormType =
  | 'delivery'
  | 'pickup'
  | 'addAddress'
  | 'rest'
  | 'booking'
  | null;

interface ModalStore {
  step?: StepFormType;

  setStep: (step: StepFormType) => void;
}

export const useDelivery = create<ModalStore>((set) => ({
  step: null,
  setStep: (step) => {
    set({ step });
  },
}));
