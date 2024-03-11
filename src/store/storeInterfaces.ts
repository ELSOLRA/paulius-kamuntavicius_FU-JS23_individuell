import { MenuItem } from "./storeTypes";

export interface State {
    isOpen: boolean;
    toggle: () => void;
}

export interface CartStore extends State {
  
  cartItems: MenuItem[];
  
  totalPrice: number 
  totalItems: number;
  // toggleCartItems: () => void;
  addToCart: (item: MenuItem) => void;
  // updateCartItem: (id: string, quantity: number) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  // calculateTotalPrice: () => void;
}

export interface OrderStore {
  orderInfo: { orderNr: string } | null;
  setOrder: (data: { orderNr: string } | null) => void;
}

export interface AuthStore {
  email: string;
  username: string;
  password: string;
  setSignData: (data: Partial<AuthStore>) => void;
}

