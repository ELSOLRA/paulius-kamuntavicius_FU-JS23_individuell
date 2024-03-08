import { create } from "zustand";
import { CartStore } from "./storeInterfaces";
import { MenuItem } from "./storeTypes";

const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  addToCart: (item: MenuItem) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCartItems;

      if (existingItem) {
        updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...item, quantity: 1 }];
      }

      const totalItems = updatedCartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
      const totalPrice = updatedCartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
      );

      return { cartItems: updatedCartItems, totalPrice, totalItems };
    });
  },
  /*  updateCartItem: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })), */
  increaseQuantity: (id: string) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      );

      const totalItems = updatedCartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
      const totalPrice = updatedCartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
      );

      return { cartItems: updatedCartItems, totalPrice, totalItems };
    });
  },
  decreaseQuantity: (id: string) => {
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, (item.quantity || 0) - 1) }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0);

      const totalItems = updatedCartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
      const totalPrice = updatedCartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
      );

      return { cartItems: updatedCartItems, totalPrice, totalItems };
    });
  },
  /*             calculateTotalPrice: () =>
            set((state) => ({
                totalPrice: state.cartItems.reduce(
                    (total, item) => total + (item.price || 0) * (item.quantity || 0),
                    0
                    ),
                })), */
  /*   decreaseQuantity: (id) =>
                    set((state) => ({
                      cartItems: state.cartItems.map((item) =>
                        item.id === id
                          ? { ...item, quantity: Math.max(0, (item.quantity || 0) - 1) }
                          : item
                      ),
                      
                    })), */
}));

export default useCartStore;
