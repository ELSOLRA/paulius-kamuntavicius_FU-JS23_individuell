import { create } from "zustand";
import { OrderStore } from "./storeInterfaces";

const useOrderStore = create<OrderStore>((set) => ({
  orderInfo: null,
  setOrder: (data) => set({ orderInfo: data }),
}));

export default useOrderStore;
