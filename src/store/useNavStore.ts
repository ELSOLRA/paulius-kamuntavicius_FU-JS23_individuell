import { create } from "zustand";
import { State } from "./storeInterfaces";

const useNavStore = create<State>((set) => ({
  isOpen: false,
  toggle: () =>
    set((state) => {
      const newIsOpen = !state.isOpen;

      document.body.style.overflow = newIsOpen ? "hidden" : "auto";

      return { isOpen: newIsOpen };
    }),
}));

export default useNavStore;