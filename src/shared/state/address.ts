import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface IAddressArgs {
  LastApt?: string | null;
  LastCommentory?: string | null;
  LastCountry?: string | null;
  LastDoorNumber?: string | null;
  LastEntreance?: string | null;
  LastFloor?: string | null;
  LastHouseNumber?: string | null;
  LastIsPrivateHouse?: number | null;
  LastStreet?: string | null;
  LastLng: number | null;
  LastLat: number | null;
  LastCityName: string | null;
  LastAddressID: number | null;
  LastAddressName: string | null;
  LastAddressOrgID: number | null;
  LastAddressType: number | null;
  LastPolygonID: string | null;
  LastAddressIsRecieved: boolean;
}

interface IAddressStore {
  address: IAddressArgs;

  setAddress: (value: IAddressArgs) => void;
  reset: () => void;
}

export const addressInitData = {
  LastApt: null,
  LastCommentory: null,
  LastCountry: null,
  LastDoorNumber: null,
  LastEntreance: null,
  LastFloor: null,
  LastHouseNumber: null,
  LastIsPrivateHouse: null,
  LastStreet: null,
  LastLng: null,
  LastLat: null,
  LastCityName: null,
  LastAddressID: null,
  LastAddressName: null,
  LastAddressOrgID: null,
  LastAddressType: null,
  LastPolygonID: null,
  LastAddressIsRecieved: false,
};

export const useAddress = create<IAddressStore>()(
  devtools(
    persist(
      (set) => ({
        address: addressInitData,
        reset: () => {
          set({ address: addressInitData });
        },
        setAddress: (address) => {
          set({
            address: {
              LastApt: address?.LastApt,
              LastCommentory: address?.LastCommentory,
              LastCountry: address?.LastCountry,
              LastDoorNumber: address?.LastDoorNumber,
              LastEntreance: address?.LastEntreance,
              LastFloor: address?.LastFloor,
              LastHouseNumber: address?.LastHouseNumber,
              LastIsPrivateHouse: address?.LastIsPrivateHouse,
              LastStreet: address?.LastStreet,
              LastLng: address?.LastLng,
              LastLat: address?.LastLat,
              LastCityName: address?.LastCityName,
              LastAddressID: address?.LastAddressID,
              LastAddressName: address?.LastAddressName,
              LastAddressOrgID: address?.LastAddressOrgID,
              LastAddressType: address?.LastAddressType,
              LastPolygonID: address?.LastPolygonID,
              LastAddressIsRecieved: address.LastAddressIsRecieved,
            },
          });
        },
      }),
      { name: 'addressStore', storage: createJSONStorage(() => sessionStorage) },
    ),
  ),
);
