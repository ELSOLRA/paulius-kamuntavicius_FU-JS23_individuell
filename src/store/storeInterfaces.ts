import { MenuItem } from "./storeTypes";

export interface State {
    isOpen: boolean;
    toggle: () => void;
}

export interface CartStore extends State {
  
  cartItems: MenuItem[];
  totalPrice: number 
  totalItems: number;
  addToCart: (item: MenuItem) => void;
  // updateCartItem: (id: string, quantity: number) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  // calculateTotalPrice: () => void;
}

