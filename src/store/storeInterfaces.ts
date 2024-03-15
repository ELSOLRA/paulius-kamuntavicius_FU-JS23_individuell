import { MenuItem } from "./storeTypes";

export interface State {
  isOpen: boolean;
  toggle: () => void;
}

export interface CartStore extends State {
  cartItems: MenuItem[];
  totalPrice: number;
  totalItems: number;
  addToCart: (item: MenuItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
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
