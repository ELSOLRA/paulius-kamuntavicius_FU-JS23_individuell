import { create } from "zustand";
import { State } from "./storeInterfaces";

const useNavStore = create<State>((set) => ({
    isOpen: false, 
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  }));

  export default useNavStore;