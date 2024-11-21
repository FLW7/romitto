import { create } from 'zustand';

import { MAP_DEFAULT } from '@/shared/const/map';
import { type ILocation } from '@/shared/type/map';

export type ICenter = ILocation;

interface ModalStore {
  center: ICenter;
  map: ymaps.Map | null;
  setCenter: (value: ICenter) => void;

  setMap: (map: ymaps.Map) => void;
}

export const useMap = create<ModalStore>((set) => ({
  center: { lat: MAP_DEFAULT.center[0], lng: MAP_DEFAULT.center[1] },
  map: null,
  setCenter: (center) => {
    set({ center });
  },

  setMap: (map) => {
    set({ map });
  },
}));
