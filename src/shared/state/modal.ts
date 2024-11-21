import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ModalType =
  | 'logout'
  | 'login'
  | 'loginCode'
  | 'addressNotSpecified'
  | 'choosingCity'
  | 'choosingMyLocation'
  | 'giftAvaliable'
  | 'getGift'
  | 'register'
  | 'chooseGift'
  | 'placingOrder'
  | 'orderSuccess'
  | 'orderReject'
  | 'orderConfirm'
  | 'rateOrder'
  | 'catalog'
  | 'bookTable'
  | 'bookTableDatePicker'
  | 'callback'
  | 'detailRest'
  | 'inputAddress'
  | 'stories'
  | 'giftNotify'
  | 'payFrame'
  | 'placingOrderCode'
  | 'PDFmenu'
  | 'detailMeal'
  | 'getGiftPromo'
  | 'adApp'
  | 'detailOrder';

interface ModalStore {
  type?: ModalType;
  nextType?: ModalType;
  isOpen: boolean;
  data?: any;
  onOpen: (type: ModalType, data?: any, nextType?: ModalType) => void;
  onClose: () => void;
  clearState: () => void;
}

export const useModal = create<ModalStore>()(
  devtools((set, get) => ({
    type: undefined,
    nextType: undefined,
    isOpen: false,
    data: {},
    onOpen: (type, data, nextType) => {
      set({ isOpen: true, type, data, nextType });
    },
    clearState: () => {
      set({
        data: {},
      });
    },
    onClose: () => {
      set({
        type: get().nextType ?? undefined,
        nextType: undefined,
        isOpen: !!get().nextType,
      });
      setTimeout(() => {
        set({ data: {} });
      }, 250);
    },
  })),
);
