import { MenuItem } from "../../store/storeTypes"

export type CartProps = {
    cartItems: MenuItem[];
    updateCartItem: (id: string, quantity: number) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    totalPrice: number;
};
