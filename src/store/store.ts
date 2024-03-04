import { create } from "zustand";

export interface NavState {
    isOpen: boolean;
    toggleNav: () => void;
}

const useNavStore = create<NavState>((set) => ({
    isOpen: false, 
    toggleNav: () => set((state) => ({ isOpen: !state.isOpen })),
  }));

  export default useNavStore;