import { create } from "zustand";


export interface LoggedStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useLoggedStore = create<LoggedStore>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
