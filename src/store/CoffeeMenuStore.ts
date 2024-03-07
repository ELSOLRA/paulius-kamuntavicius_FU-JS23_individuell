import { create } from "zustand";


type MenuItem = {
    id: string;
    title: string;
    desc: string;
    price: number; 
}

type CoffeeMenuState = {
    menu: MenuItem[];
    setMenu: (newMenu: MenuItem[]) => void;
}

const useCoffeeMenuState = create <CoffeeMenuState>((set) => ({
    // could be used devtools for better control and redux extension
    menu: [],
    setMenu: (newMenu) => set({ menu: newMenu }),
}))

export default useCoffeeMenuState;