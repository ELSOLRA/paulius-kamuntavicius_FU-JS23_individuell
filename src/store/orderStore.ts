import { create } from "zustand";
import { OrderStore } from "./storeInterfaces";


const useOrderStore = create<OrderStore>((set) => ({
    // etaData: 0, 
  orderInfo: null,
//   setEtaData: (data) => set({ etaData: data }),
  setOrder: (data) => set({ orderInfo: data }),
}));

export default useOrderStore;