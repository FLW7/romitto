import { create } from 'zustand';

interface IActiveCategoryStore {
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  sectionsListRef: any[];
  setSectionsListRef: (item: any) => void;
  clearSectionListRef: () => void;
  clearCategoriesListRef: () => void;
  categoriesListRef: any[];
  setCategoriesListRef: (item: any) => void;
}

export const useActiveCategory = create<IActiveCategoryStore>((set) => ({
  activeCategory: 0,
  setActiveCategory(index) {
    set({ activeCategory: index });
  },
  sectionsListRef: [],
  setSectionsListRef(item) {
    set((state) => ({ sectionsListRef: [...state.sectionsListRef, item] }));
  },
  clearSectionListRef() {
    set(() => ({ sectionsListRef: [] }));
  },
  categoriesListRef: [],
  setCategoriesListRef(item) {
    set((state) => ({ categoriesListRef: [...state.categoriesListRef, item] }));
  },
  clearCategoriesListRef() {
    set(() => ({ categoriesListRef: [] }));
  },
}));
