import { create } from "zustand";
import { AuthStore } from "./storeInterfaces";

const useAuthStore = create<AuthStore>((set) => ({
  email: "",
  username: "",
  password: "",
  setSignData: (data: Partial<AuthStore>) => set(data),
}));

export default useAuthStore;
