import { create } from 'zustand';

interface ModalStore {
  activeId: string;

  setActiveId: (id: string) => void;
}

export const useActivePlaceId = create<ModalStore>((set) => ({
  activeId: '',
  setActiveId: (activeId) => {
    set({ activeId });
  },
}));
